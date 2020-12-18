import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Register from './components/routes/register/register';
import Header from './components/static/header/header';

import * as ActionType from './redux/actions/actions'
import LedLine from './style/led_line';

class App extends Component {
  render() {
    let ledline;
    let styles = {
      header: "application_header cyberpunk",
      body: "application_body cyberpunk",
      foot: "application_foot cyberpunk",
      body_cmp: "application_body__component cyberpunk"
    }

    if (!this.props.cyberpunk) {
      styles = {
        header: "application_header",
        body: "application_body",
        foot: "application_foot",
        body_cmp: "application_body__component"
      }
    
    }else {
    ledline = <LedLine/>
    }

    return (
      <BrowserRouter>
        <div className="application_container">
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.body}>
            <div className={styles.body_cmp}>
              {ledline}
              <Route path="/register" exact component={Register} />
            </div>
          </div>
          <div className={styles.foot}>
            !sup
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
