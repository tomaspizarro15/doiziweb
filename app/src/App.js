import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './components/routes/register/register';
import Header from './components/static/header/header';

import * as ActionType from './redux/actions/actions'
import * as cookies from './factory/cookie'
import LedLine from './style/led_line';
import Cookies from 'universal-cookie';
import login from './components/routes/login/login';

class App extends Component {
  state = {
    isSession: false,
    session : {},
  }

  componentDidMount() {
    const cookie = new Cookies();
    const token = cookie.get('session');

    if (token) {
      fetch('http://localhost:8080/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': cookies.get('session')
        }
      }).then(promise => promise.json())
        .then(data => {
          if (data.status === 200) {
            this.setState({ isSession: true , session : data.token})
          }
        }
        )
    }
  }
  render() {
    let ledline;
    console.log(this.state.isSession)

    const styles = {
      header: "application_header",
      body: "application_body",
      foot: "application_foot",
      body_cmp: "application_body__component",
      cont: "application_container",
    }
    return (
      <BrowserRouter>
        <div className={styles.cont}>
          {this.state.isSession ?
            <div className={styles.header}>
              <Header />
            </div>
            : null}
          <div className={styles.body}>
            <div className={styles.body_cmp}>
              {!this.state.isSession ?
                <Switch>
                  <Route path="/login" exact component={login} />
                  <Route path="/register" exact component={Register} />
                </Switch>
                : <Redirect to ="/"/>}
            </div>
          </div>
        </div>
      </BrowserRouter>

    );
  }
}

const mapStateToProps = state => {
  return {
    cyberpunk: state.cyberpunk,
  }
}
const dispatchActionsToProps = dispatch => {
  return {
    changeTheme: () => dispatch(ActionType.changeTheme())
  }
}

export default connect(mapStateToProps, dispatchActionsToProps)(App);
