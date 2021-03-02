import React, { useEffect, useState } from 'react';
import Post from '../post/post';
import Socket from 'socket.io-client'
import './list-posts.css';
import * as Posts from './../../../../../factory/posts'


const PostList = (props) => {
    const [posts, setPosts] = useState([])

    useEffect(async () => {
        try {
            Posts.getAll('http://localhost:8080/posts').then(data => {
                setPosts(data.posts)
            }).catch()
            posts.map((post) => {
                post.createdAt = new Date().getFullYear()
            })
            return new window.AbortController().abort();
        } catch (error) {
            setPosts([]);
        }
    }, [])

    useEffect(async () => {
        const socket = Socket('http://localhost:8080/')
        socket.on('new_post', (socket) => setPosts([...posts, socket.post]))
        socket.removeAllListeners('invitation');
        return new window.AbortController().abort();
    }, [posts])


    return (
        <ul className="dis post_list" > {
            posts.reverse().map(post => {
                return (
                    <Post post={post} />
                )
            })
        }</ul>
    )
}
export default PostList;