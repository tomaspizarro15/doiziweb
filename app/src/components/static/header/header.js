import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Linker from './functions/linker';
import './header.css';
import * as ActionType from '../../../redux/actions/actions'
import Cookies from 'universal-cookie';

const Header = props => {
    const [state, setState] = useState({
        links: [],
        usersFound: [{}],
        searchValue: "",
    })

    const logoutHandler = () => {
        const cookie = new Cookies();
        cookie.remove('session');
        window.location.reload();
    }

    const searchInputHandler = (event) => {
        setState({ searchValue: event.target.value, usersFound: state.usersFound, links: state.links })
    }

    return (

            <header className="header_cnt">
            {/* <div className="header_burger__button">
                <ul>
                    <li>---</li>
                    <li>---</li>
                    <li>---</li>
                </ul>
            </div> */}
            <div className="disRL" style={{ width: "20%" }}>
                <Link style={{ fontWeight: "bold", fontSize: "24px" , textDecoration : 'none' }} to="/">DOIZI</Link>
            </div>
            <div className="searcher_cnt">
                <div className="disRL searcher">
                    <input className="dis searcher_input" placeholder="search..." value={state.searchValue} onChange={(event) => { searchInputHandler(event) }}></input>
                </div>
                <div className="searcher_result">
                   
                </div>
            </div>
            <div style={{ width: "80%" }}></div>
            <button className="header_button" onClick={logoutHandler}>Logout</button>
        </header>
   
    )
}
export default Header;

