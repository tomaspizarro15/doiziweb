import React, { Component, Fragment } from 'react';
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
import Intro from './components/routes/introducción/intro';
import Main from './components/routes/main/main';
import SideComponent from './components/static/side_component/side_component';
import NewGroup from './components/routes/new_group/new_group';

class App extends Component {
  state = {
    isSession: false,
    session: {},
    resolved: false,
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
          this.setState({ resolved: true })
          if (data.status === 200) {
            this.setState({ isSession: true, session: data.token })
            this.props.setUser(data.user)
          }
        }).catch((err) => {
          console.log(err)
          this.setState({ resolved: true })
        })
    } else {
      this.setState({ resolved: true })
    }
  }
  render() {
    console.log(this.props.user)
    const styles = {
      header: "application_header",
      body: "disR application_body",
      foot: "dis application_foot",
      body_cmp: " dis application_body__component",
      cont: "dis application_container",
    }
    return (
      <BrowserRouter>
        <div className={styles.cont}>
          {this.state.isSession ?
            <div className={styles.header}>
              <Header status={this.state.isSession} />
            </div>
            : null}
          <div className={styles.body}>
            {this.state.isSession ? <SideComponent /> : null}
            <div className={styles.body_cmp}>
              {this.state.resolved ?
                !this.state.isSession ?
                  <Switch>
                    <Route path="/login" exact component={login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="*" exact component={() => <Redirect to="/login" />} />
                  </Switch>
                  :
                  <Switch>
                    <Route path="/intro" exact component={() => <Intro />} />
                    <Route path="/profile" exact component={() => <p>Sup!</p>} />
                    <Route path="/new-group" exact component={() => <NewGroup />} />
                    <Route path="/" exact component={() => <Main user={this.props.user} />} />
                    <Route path="*" exact component={() => <Redirect to="/" />} />
                  </Switch>
                : <Route path="/" exact component={() => null} />
              }
            </div>
          </div>
        </div>
      </BrowserRouter>
    )}
}
const mapStateToProps = state => {
  return {
    user: state.user,
  }
}
const dispatchActionsToProps = dispatch => {
  return {
    setUser: (user) => dispatch(ActionType.setUser(user))
  }
}

console.log()

export default connect(mapStateToProps, dispatchActionsToProps)(App);
