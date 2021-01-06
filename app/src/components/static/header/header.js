import React , {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Linker from './functions/linker';
import './header.css';
import * as ActionType from '../../../redux/actions/actions'
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
                <p style={{fontWeight : "bold" , fontSize:"24px"}}>DOIZI</p>
                <Linker links = {this.state.links}/>
                <div style = {{width : "100%"}}></div>
                <button onClick={this.props.changeTheme}>Sup!</button>
            </header>
        )
    }
}
const mapStateToProps = state => {
    return {
        cyberpunk : state.cyberpunk
    }
}
const dispatchActionsToProps = dispatch => {
    return {
        changeTheme : () => dispatch(ActionType.changeTheme())
    }
}

export default connect(mapStateToProps , dispatchActionsToProps)(Header); 