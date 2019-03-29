import React, { Component } from 'react';
import './App.css';
import HomeNavbar from './components/navbar';
import LoginPage from './components/login_page';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
       <HomeNavbar/>
       <Router>
       <Switch>
         <Route path="/login" component={LoginPage}/>
       </Switch>
       </Router>
      </div>
    );
  }
}

export default App;
