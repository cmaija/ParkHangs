import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import NavBar from './NavBar';
import MainContainer from './MainContainer';
import DetailModal from './DetailModal'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
    }

    this.closeDetailModal = this.closeDetailModal.bind(this)
  }

  closeDetailModal () {
    this.closeModal()
  }

  closeModal () {
    this.setState({modalOpen: false})
  }

  openModal () {
    this.setState({modalOpen: true})
  }


  render() {
    return (
      <div className="App">
          <div>
            <NavBar />
            <MainContainer />
            <DetailModal close={this.closeDetailModal} showModal={this.state.modalOpen} />
          </div>
      </div>
  );
  }
}

export default App;
