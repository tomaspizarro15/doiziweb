import React from 'react';
import './post.css';


const Post = props => {
    return (
        <div className="disC post">
            <div className="dis post__content">
                <div className="disRL post_user">@{props.post.user}</div>
                <p className="post_text">{props.post.content}</p>
                <p>{props.post.createdAt}</p>
            </div>
            <div className="post__feedback"></div>
        </div>
    )
}
export default Post