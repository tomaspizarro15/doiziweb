import React from 'react'; 
import './../header.css';
import {Link} from 'react-router-dom'

const Linker = (props) => {
    return(
        <ul>{props.links.map(link => <Link  key = {link.id} to = {link.href}>{link.label}</Link>)}</ul>
    )
}

export default Linker; 