import React, { useEffect, useState } from 'react';
import * as Posts from './../../../factory/posts';
import Socket from 'socket.io-client';

import './main.css'
import NewPost from './sub-comps/new-post/new-post';

const Main = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(async () => {
        try {
            const data = await Posts.getAll('http://localhost:8080/posts')
            console.log(data)
            data.posts.map((post) => {
                post.createdAt = new Date(post.createdAt).getDate() + '/' + new Date(post.createdAt).getMonth() + ' - ' + new Date(post.createdAt).getHours() + ':' + new Date(post.createdAt).getMinutes()
            })
            setPosts(data.posts)

        } catch (error) {
            setPosts([]);
        }
    }, [])

    useEffect(async () => {
        const socket = Socket('http://localhost:8080/')
        socket.on('new_post', (socket) => setPosts([...posts, socket.post]))
        socket.removeAllListeners('invitation');
    }, [posts])

    return (
        <div className="disC main_container">
            <NewPost posts={posts} user={props.user} />
        </div>
    )

}

export default Main; 