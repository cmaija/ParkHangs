import React, {Component} from 'react';
import './App.css';
import Map from './components/Map.js';
import NavBar from './components/NavBar';
import MainContainer from './components/MainContainer';
import DetailModal from './components/DetailModal';
import EventDetailModal from './components/EventDetailModal';
import CalendarWrapper from './components/CalendarWrapper';
import Searchbar from "./components/Searchbar";

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            modalOpen: false,
            eventmodalOpen: false
        };

        this.closeDetailModal = this.closeDetailModal.bind(this);
        this.openModal = this.openModal.bind(this);

        this.closeEventModal = this.closeEventModal.bind(this);
        this.openEventModal = this.openEModal.bind(this);
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

    closeEventModal(){
        this.closeEModal()
    }

    closeEModal(){
        this.setState({eventmodalOpen: false})
    }

    openEModal(){
        this.setState({eventmodalOpen:true})
    }

    render() {
        return (
            <div className="App">
                <div>
                    <NavBar/>
                    <button onClick={this.openModal}>Show detailed modal</button>
                    <DetailModal close={this.closeDetailModal} showModal={this.state.modalOpen}/>
                    <Map/>
                    <button onClick={this.openEventModal}>Show event modal</button>
                    <EventDetailModal close={this.closeEventModal} showModal={this.state.eventmodalOpen}/>
                    <Searchbar placeholder="Search..."/>
                    <CalendarWrapper/>
                </div>
            </div>
        );
    }
}

export default App;
