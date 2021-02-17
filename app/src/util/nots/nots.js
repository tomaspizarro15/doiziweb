import React from 'react';
import { Link } from 'react-router-dom';
import './nots.css'; 
//Recieves an array [] and uses its length property. 

const Nots = (props) => {
    return (
        props.arr ?
            props.arr.length > 0 ? <Link className="dis nots"  to="/notifications"><p>{props.arr.length} new</p></Link> : null
            : null
    )
}

export default Nots;