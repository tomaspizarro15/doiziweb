import React, { useEffect, useState } from 'react';
import * as cookies from './../../../../../factory/cookie';
import './post.css';
import Arrow from '../../../../../util/arrow/arrow';
import ListWithIcon from '../../../../../util/Lists/list_with_icon';


const Post = props => {

    const [state, setState] = useState({
        userData: {},
        fullPost: {},
    })

    useEffect(() => {
        fetch(`http://localhost:8080/posts/full-post?q=${props.post._id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': cookies.get('session')
                }
            }).then(res => res.json()).then(data => {
                if (data.user) {
                    setState({ userData: data.user, fullPost: data.post })
                }
            })
    }, [props.post])

    return (
        <div className="disR post_wrapper" key={props.post.id}>
            <div className="post_side">
                <ListWithIcon/>
            </div>
            <div className="disC post">
                <div className="dis post__content">
                    <div className="disRL post_user">
                        <p className="post_user__name">{props.post.userFullName}</p>
                        <p className="post_user__nick">@{props.post.username}</p>
                        <div id="spacer" style={{ width: '70%' }}></div>
                        <p className="post_user__nick">{props.post.createdAt}</p>
                    </div>
                    <div style={{ width: '100%', textAlign: 'left' }}>
                        <p className="post_text">{props.post.content}</p>
                    </div>
                </div>
                <div className="disRL post__feedback">
                    <input placeholder="Hacer un comentario" className="global_input" />
                    <button className="dis global_button_small">
                        <Arrow color="#2B2B2B" />
                    </button>
                </div>
            </div>

        </div>
    )
}
export default Post