import React from 'react';
import './titles.css'
const Title = (props) => {
    return (
        <p className="title_p" style={{ margin: "5px", color: props.color }}>{props.texto}</p>
    )
}

export default Title;