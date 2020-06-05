import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import MainContainer from './MainContainer';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <MainContainer />
      </div>
    );
  }
}

export default App;
