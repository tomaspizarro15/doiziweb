import React, { useEffect, useState } from 'react';
import * as Posts from './../../../factory/posts';
import './main.css'

const Main = (props) => {

    useEffect(async (data) => {
        const posts = await Posts.getAll('http://localhost:8080/posts');
        console.log(posts)
    }, [])

    return (
        <div className="dis main_container">
            
        </div>
    )

}

export default Main; 