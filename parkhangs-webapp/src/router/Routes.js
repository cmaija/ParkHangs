import React, { Component } from 'react'
import NavBar from 'components/NavBar'
import { Switch, Route } from 'react-router-dom'
import MapView from 'views/MapView'
import CalendarsView from 'views/CalendarsView'
import NoMatch from 'views/NoMatch'
import Modal from 'features/modal/Modal'
import 'App.css'
import { connect } from "react-redux";
import UserProfileView from "../views/UserProfileView";
import { fetchParks, fetchFacilityTypes, fetchSpecialFeatures } from 'features/parks/parksSlice'
import { fetchEvents } from 'features/events/eventsSlice'
import { fetchEventComments, fetchParkComments } from 'features/comments/commentSlice'

class Routes extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <div className="App-main">
                    <Switch>
                        <Route exact path="/" component={MapView}/>
                        <Route exact path="/park-events" component={CalendarsView}/>
                        <Route exact path="/user" component={UserProfileView}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
                {this.props.modalOpen &&
                <Modal {...this.props.modalProps}/>
                }
            </div>
        )
    }

    componentDidMount = async () => {
        // fetch all events, parks, comments here
        this.props.getAllParks()
        this.props.getAllEvents()
        this.props.getAllEventComments()
        this.props.getAllParkComments()
        this.props.getFacilityTypes()
        this.props.getSpecialFeatures()
    }

}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.modalOpen,
        modalProps: state.modal.modalProps,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllParks: () => dispatch(fetchParks()),
    getAllEvents: () => dispatch(fetchEvents()),
    getAllEventComments:() => dispatch(fetchEventComments()),
    getAllParkComments:() => dispatch(fetchParkComments()),
    getFacilityTypes: () => dispatch(fetchFacilityTypes()),
    getSpecialFeatures: () => dispatch(fetchSpecialFeatures()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
