import React, { useEffect, useState } from 'react';
import * as Posts from './../../../factory/posts';
import Socket from 'socket.io-client';

import './main.css'
import NewPost from './sub-comps/new-post/new-post';

const Main = (props) => {
    return (
        <div className="disC main_container">
            <NewPost  user={props.user} />
        </div>
    )

}

export default Main; 