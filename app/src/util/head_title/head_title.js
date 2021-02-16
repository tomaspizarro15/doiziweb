import React from 'react';
import './head_title.css'
const HeadTitle = (props) => {
    return (
        <p className="head_title_p" style={{ margin: "5px", color: props.color }}>{props.texto}</p>
    )
}

export default HeadTitle;