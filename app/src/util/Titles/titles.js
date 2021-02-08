import React from 'react';

const Title = (props) => {
    return (
        <p style={{ color: props.color  , fontSize : props.size + 'px' , fontWeight : 'bold'}}>{props.texto}</p>
    )
}

export default Title;