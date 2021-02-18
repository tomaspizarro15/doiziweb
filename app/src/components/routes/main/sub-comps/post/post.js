import React, { useEffect, useState } from 'react';
import * as cookies from './../../../../../factory/cookie';
import './post.css';
import Arrow from '../../../../../util/arrow/arrow';


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
                console.log(data.user)
                setState({ userData: data.user, fullPost: data.post })
            })
    }, [props.post])
    return (
        <div className="disR post_wrapper">                                                     
            <div className="post_side">
            </div>
            <div className="disC post">
                <div className="dis post__content">
                    <div className="disRL post_user">
                        <p className="post_user__name">{state.userData.name}{state.userData.lastname}</p>
                        <p className="post_user__nick">@{props.post.user}</p>
                        <div id="spacer" style={{ width: '70%' }}></div>
                        <p className="post_user__nick">{props.post.createdAt}</p>
                    </div>
                    <div style={{width : '100%' , textAlign : 'left'}}>
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