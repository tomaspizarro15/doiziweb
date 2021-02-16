import React from 'react';


const Tooltip = (props) => {
    return (
        <div className="tooltip"><span className="tooltiptext">{props.text}</span></div>
    )
}

export default Tooltip; 