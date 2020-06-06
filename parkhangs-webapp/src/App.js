import React, {Component} from 'react';
import './App.css';
import Map from './components/Map.js';
import NavBar from './components/NavBar';
import MainContainer from './components/MainContainer';
import DetailModal from './components/DetailModal';
import CalendarWrapper from './components/CalendarWrapper';
import Searchbar from "./components/Searchbar";

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            modalOpen: false,
        };

        this.closeDetailModal = this.closeDetailModal.bind(this)
    }

    closeDetailModal() {
        this.closeModal()
    }

    closeModal() {
        this.setState({modalOpen: false})
    }

    openModal() {
        this.setState({modalOpen: true})
    }

    render() {
        return (
            <div className="App">
                <div>
                    <NavBar/>
                    <MainContainer/>
                    <DetailModal close={this.closeDetailModal} showModal={this.state.modalOpen}/>
                    <Map/>
                    <Searchbar placeholder="Search..."/>
                    <CalendarWrapper/>
                </div>
            </div>
        );
    }
}

export default App;

