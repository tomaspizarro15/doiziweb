import React , {Component} from 'react';
import {Link} from 'react-router-dom'
import Linker from './functions/linker';
import './header.css';

class Header extends Component {
    
    state = {
        links : [
            {id : 0 , label : "Register" , href : "/register"},
            {id : 1 , label : "Login" , href : "/login"},
        ]
    }
    
    render() {
        return(
            <header className="header_cnt">
                <p>This will be great</p>
                <Linker links = {this.state.links}/>
            </header>
        )
    }
}

export default Header; 