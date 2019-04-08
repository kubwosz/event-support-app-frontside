import React, { Component } from 'react';
import './App.css';
import HomeNavbar from './components/navbar';
import LoginPage from './components/login_page';
import RegisterPage from './components/register_page';
import MembersList from './components/members_list';
import EventsList from './components/events_list';
import MemberDetails from './components/member_details';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
       <HomeNavbar/>
       <Router>
       <Switch>
         <Route exact path="/login" component={LoginPage}/>
         <Route exact path="/register" component={RegisterPage}/>
         <Route exact path="/members" component={MembersList}/>
         <Route exact path="/events" component={EventsList}/>
         <Route exact path="/memberDetails/:id" component={MemberDetails}/>
         <Route path="/" component={RegisterPage}/>
       </Switch>
       </Router>
      </div>
    );
  }
}

export default App;
