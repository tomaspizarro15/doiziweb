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


   
    useEffect(() => {
        if (maxCounter > counter) {
            classes = 'new_post__counter error'
        }
    }, [counter])

    const inputHandler = (event) => {
        setValue(event.target.value)
        setCounter(event.target.value.length)
    }

    const submitPostHandler = async () => {
        const result = await Post.post('http://localhost:8080/posts/post', value)
        console.log(result)
    }

    return (
        <div className="disR new_post__ctn">
            <div className="disC new_post__main">
                <div className="disCL new_post__send_post">
                    <Title texto={"Hola " + props.user.name + '...'} color="gray" />
                    <textarea value={value} onChange={(e) => { inputHandler(e) }} className="global_textarea short" placeholder="Comentar que esta sucediendo" />
                    <p className={counter < maxCounter ? "new_post__counter" : "new_post__counter error"}>{counter} / {maxCounter}</p>
                    <button className="global_button" disabled={counter > maxCounter ? true : false || counter <= 0} onClick={submitPostHandler}>Publicar</button>
                </div>
                <PostList/>
            </div>
            <div className="disC new_post__side">
                <Title texto="Dummy trendings" />
                <div className=""></div>
            </div>
        </div>
    )
}

export default NewPost;