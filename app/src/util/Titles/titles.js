import React from 'react';

const Title = (props) => {
    return (
        <p style={{ color: props.color  , fontSize : props.size}}>{props.texto}</p>
    )
}

export default Title;