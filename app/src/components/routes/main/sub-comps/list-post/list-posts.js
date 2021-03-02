import React, { useEffect, useState } from 'react';
import Post from '../post/post';
import Socket from 'socket.io-client'
import './list-posts.css';
import * as Posts from './../../../../../factory/posts'
import * as Cookies from './../../../../../factory/cookie'

const PostList = (props) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
      
        fetch('http://localhost:8080/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('session')
            }
        }).then(res => res.json()).then(data => {
            setPosts(data.posts)
        }).catch(() => {
            setPosts([]);

        })
    }, [])

    useEffect(() => {
        const socket = Socket('http://localhost:8080/')
        socket.on('new_post', (socket) => setPosts([...posts, socket.post]))
        socket.removeAllListeners('invitation');
        return new window.AbortController().abort();
    }, [posts])


    return (
        <ul className="dis post_list" > {
            posts.reverse().map(post => {
                console.log(post)
                return (
                    <Post key={post._id} post={post} />
                )
            })
        }</ul>
    )
}
export default PostList;