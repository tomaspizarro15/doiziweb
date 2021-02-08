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
import Login from './components/routes/login/login';
import Intro from './components/routes/introducción/intro';
import Main from './components/routes/main/main';
import SideComponent from './components/static/side_component/side_component';
import NewGroup from './components/routes/new_group/new_group';
import Profile from './components/routes/profile/profile';
import error404 from './components/routes/error/404';
import JoinGroup from './components/routes/join_group/join_group';
import Groups from './components/routes/groups/groups';
import Messages from './components/routes/messages/messages';



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
            console.log(data.user)
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

  PrivateRoute = ({ component: Component, ...prop }) => {
    <Route {...prop} render={(props) => (
      this.state.isSession === true ? <Component {...props} /> : <Redirect to="/login" />
    )} />
  }
  render() {
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
            <div className="application_header__spacer">
              <div className={styles.header}>
                <Header status={this.state.isSession} />
              </div>
            </div>
            : null}
          <div className={styles.body}>
            {this.state.isSession ? <SideComponent /> : null}
            <div className={styles.body_cmp}>
              <Switch>
                {this.state.isSession ?
                  <Switch>
                    <Route path="/messages" component={Messages} />
                    <Route path="/join-group" component={JoinGroup} />
                    <Route path="/my-groups" component={() => <Groups user={this.props.user} />} />
                    <Route path="/new-group" component={() => <NewGroup user={this.props.user} />} />
                    <Route exact path="/home" component={() => <Main user={this.props.user} />} />
                    <Route component={Profile} />
                    <Redirect to="/home" />
                  </Switch>
                  :
                  <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route component={Login} />
                  </Switch>}

              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
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
