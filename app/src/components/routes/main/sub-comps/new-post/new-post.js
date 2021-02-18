import React, { Fragment, useEffect, useState } from 'react';
import Title from '../../../../../util/Titles/titles';
import PostList from '../list-post/list-posts'
import * as Post from './../../../../../factory/posts'

import './new-post.css';
let classes = {
    counter: 'new_post__counter'
}
const NewPost = props => {
    const [counter, setCounter] = useState(0);
    const [maxCounter, setMaxCounter] = useState(250)
    const [value, setValue] = useState("");

    const inputHandler = (event) => {
        setValue(event.target.value)
        setCounter(event.target.value.length)
    }

    const [posts, setPosts] = useState([])

    useEffect(async () => {
        try {
            const data = await Post.getAll('http://localhost:8080/posts')
            console.log(data)
            data.posts.map((post) => {
                post.createdAt = new Date(post.createdAt).getHours() + ':' + new Date(post.createdAt).getMinutes()
            })
            setPosts(data.posts)
        } catch (error) {
            setPosts([]);
        }
    }, [])
    useEffect(() => {
        if (maxCounter > counter) {
            classes = 'new_post__counter error'
        }
    }, [counter])

    const submitPostHandler = async () => {
        const result = await Post.post('http://localhost:8080/posts/post', value)
        console.log(result)
    }

    return (
        <div className="disR new_post__ctn">
            <div className="disC new_post__main">
                <Title texto="Inicio" color="#5A7EFF" />
                <div className="disCL new_post__send_post">
                    <Title texto={"Hola " + props.user.name + '...'} color="gray" />
                    <textarea value={value} onChange={(e) => { inputHandler(e) }} className="global_textarea short" placeholder="Comentar que esta sucediendo" />
                    <p className={counter < maxCounter ? "new_post__counter" : "new_post__counter error"}>{counter} / {maxCounter}</p>
                    <button className="global_button" disabled={counter > maxCounter ? true : false} onClick={submitPostHandler}>Publicar</button>
                </div>
                <PostList posts={posts} />
            </div>
            <div className="disC new_post__side">
            
            </div>
        </div>
    )
}

export default NewPost;