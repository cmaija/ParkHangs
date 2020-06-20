import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { Switch, Route } from 'react-router-dom'
import MapView from '../views/MapView'
import CalendarsView from '../views/CalendarsView'
import NoMatch from '../views/NoMatch'
import Modal from '../features/modal/Modal'
import '../App.css'
import { connect } from "react-redux";

class Routes extends Component {
    render () {
        console.log(this.props.modalOpen)
        return (
            <div className="App">
                <NavBar />
                <div className="App-main">
                    <Switch>
                        <Route exact path="/" component={MapView} />
                        <Route exact path="/park-events" component={CalendarsView} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
                {this.props.modalOpen &&
                     <Modal {...this.props.modalProps}/>
                 }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.modalOpen,
        modalProps: state.modal.modalProps,
    }
}

export default connect(mapStateToProps, null)(Routes)
