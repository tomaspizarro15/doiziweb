import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Linker from './functions/linker';
import './header.css';
import * as ActionType from '../../../redux/actions/actions'
import Cookies from 'universal-cookie';

const Header = props => {
    const [state, setState] = useState({
        links: [
            { id: 0, }
        ],
        usersFound: [{}],
        searchValue: "",
    })

    const logoutHandler = () => {
        const cookie = new Cookies();
        cookie.remove('session');
        window.location.replace('http://localhost:3000/login');
    }

    const searchInputHandler = (event) => {
        setState({ searchValue: event.target.value, usersFound: state.usersFound, links: state.links })
    }

    return (
        <nav className="header">
            <div className="dis header_wrap">
                <div className="disRL header_content">
                    <Link className="header_title" to="/">DOIZI</Link>
                    <div className="disR header_links">
                        
                    </div>
                    <div className="disR header_logout">
                        <button className="header_button" onClick={logoutHandler}>Log out</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Header;

