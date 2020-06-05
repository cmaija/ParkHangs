import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map.js';
import NavBar from './NavBar';
import MainContainer from './MainContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div>
        <NavBar />
        <MainContainer />
      </div>
    );
  }
}

export default App;
