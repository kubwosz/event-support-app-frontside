import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeNavbar from './components/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
       <div><HomeNavbar/></div>
      </div>
    );
  }
}

export default App;
