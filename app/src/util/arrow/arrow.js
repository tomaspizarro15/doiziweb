import React from 'react';
import './arrow.css';


const Arrow = (props) => {
    return (
        <div className="dis like_button">
            <div className="dis arrow_cnt">
                <div className="arrow top" style={{borderColor : props.color}}></div>
            </div>
        </div>
    )
}

export default Arrow; 