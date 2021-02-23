import React from 'react';
import Post from '../post/post';
import './list-posts.css';

const PostList = (props) => {
    const posts = [...props.posts]

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