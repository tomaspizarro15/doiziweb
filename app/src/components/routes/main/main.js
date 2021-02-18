import React, { useEffect, useState } from 'react';
import * as Posts from './../../../factory/posts';
import * as Cookies from './../../../factory/cookie';
import './main.css'
import NewPost from './sub-comps/new-post/new-post';

const Main = (props) => {

    useEffect(async (data) => {
        const posts = await Posts.getAll('http://localhost:8080/posts');
        
    }, [])

    
    return (
        <div className="disC main_container">
            <NewPost user = {props.user}/>
        </div>
    )

}

export default Main; 