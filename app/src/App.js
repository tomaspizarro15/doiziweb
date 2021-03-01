import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './components/routes/register/register';
import Header from './components/static/header/header';
import * as ActionType from './redux/actions/actions'
import * as cookies from './factory/cookie'
import Cookies from 'universal-cookie';
import Login from './components/routes/login/login';
import Main from './components/routes/main/main';
import SideComponent from './components/static/side_component/side_component';
import NewGroup from './components/routes/new_group/new_group';
import Profile from './components/routes/profile/profile';
import JoinGroup from './components/routes/join_group/join_group';
import Groups from './components/routes/groups/groups';
import Messages from './components/routes/messages/messages';

import Socket from 'socket.io-client';

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
          'Authorization': cookies.get('session')
        }
      }).then(promise => promise.json())
        .then(data => {
          this.setState({ resolved: true })
          if (data.status === 200) {
            console.log(data)
            this.setState({ isSession: true, session: data.token })

            this.props.setUser(data.user)
            const socket = Socket('http://localhost:8080/');
            socket.on('invitation', ((data) => {
              console.log("Incoming data from server", data)
            }))
            socket.removeAllListeners('invitation');
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
      body: "disRLT application_body",
      foot: "dis application_foot",
      body_cmp: " dis application_body__component",
      cont: "disC application_container",
    }
    return (
      <BrowserRouter>
        <div className={styles.cont}>
          {this.state.isSession ?
            <Fragment>
              <Header />
              <div className="header_spacer"><p></p></div>
            </Fragment>

            : null}
          <div className={styles.body}>
            {this.state.isSession ? <SideComponent user={this.props.user} /> : null}
            <div className={styles.body_cmp}>
              <Switch>
                {this.state.isSession ?
                  <Switch>
                    <Route path="/messages" component={Messages} />
                    <Route path="/join-group" component={JoinGroup} />
                    <Route path="/my-groups" component={() => <Groups user={this.props.user} />} />
                    <Route path="/new-group" component={() => <NewGroup user={this.props.user} />} />
                    <Route exact path="/" component={() => <Main user={this.props.user} />} />
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
export default connect(mapStateToProps, dispatchActionsToProps)(App);
