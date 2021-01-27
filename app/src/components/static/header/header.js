import React , {Component , useState} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Linker from './functions/linker';
import './header.css';
import * as ActionType from '../../../redux/actions/actions'
import Cookies from 'universal-cookie';

const Header = props => {
    const [state, setState] = useState({
        links : []
    })

    const logoutHandler = () => {
        const cookie = new Cookies(); 
        cookie.remove('session'); 
        window.location.reload(); 
    }

    return(
        <header className="header_cnt">
        <p style={{fontWeight : "bold" , fontSize:"24px"}}>DOIZI</p>
        {props.status ?   <Linker links = {state.links}/> : null}
        <div style = {{width : "100%"}}></div>
        <button className="header_button" onClick = {logoutHandler}>Logout</button>
    </header>
    )
}
export default Header; 

