import React, { Component } from 'react';
import './App.css';
import HomeNavbar from './components/navbar';
import LoginPage from './components/login_page';
import RegisterPage from './components/register_page';
import MembersList from './components/members_list';
import EventsList from './components/events_list';
import EventDetails from './components/event_details';
import EditEvent from './components/edit_event';
import addEvent from './components/add_event';
import UserDetails from './components/user_details';
import {BrowserRouter as Router,Route, Switch,withRouter } from 'react-router-dom';

class App extends Component {

  checkAuth = () => {
    const token = localStorage.getItem("token");
    // const refreshToken = localStorage.getItem("refreshToken");
    console.log(token);
  };

  render() {
    const HomeNavbarWithRouter = withRouter(HomeNavbar);
    return (
      <div className="App">
       <Router>
         <HomeNavbarWithRouter/>
       <Switch>
         <Route exact path="/login" component={LoginPage}/>
         <Route exact path="/addEvent" component={addEvent}/>
         <Route exact path="/register" component={RegisterPage}/>
         <Route exact path="/members" component={MembersList}/>
         <Route exact path="/event/:id" component={EventDetails}/>
         <Route exact path="/event/:id/edit" component={EditEvent}/>
         <Route exact path="/events" component={EventsList}/>
         <Route exact path="/user/:id" component={UserDetails}/>
         <Route path="/" component={EventsList}/>
       </Switch>
       </Router>
      </div>
    );
  }
}

export default App;
