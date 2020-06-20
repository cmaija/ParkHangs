import React from 'react'
import NavBar from '../components/NavBar'
import { Switch, Route } from 'react-router-dom'
import MapView from '../views/MapView'
import CalendarsView from '../views/CalendarsView'
import NoMatch from '../views/NoMatch'
import Modal from '../features/modal/Modal'
import '../App.css'
import { connect } from "react-redux";

const Routes = (props) => {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/" component={MapView} />
                <Route exact path="/park-events" component={CalendarsView} />
                <Route component={NoMatch} />
            </Switch>
            <Modal />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        modal: state.modalOpen
    }
};

export default connect(mapStateToProps, null)(Routes);
