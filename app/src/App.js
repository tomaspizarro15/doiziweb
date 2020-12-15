import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Register from './components/routes/register/register';
import Header from './components/static/header/header';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="application_container">
          <div className="application_header">
            <Header />
          </div>
          <div className="application_body">
            <div className="application_body__component">
              <Route path="/register" exact component = {Register}/>
            </div>
          </div>
          <div className="application_foot">
            !sup
          </div>
        </div>
      </BrowserRouter>

    );
  }
}
export default App;
