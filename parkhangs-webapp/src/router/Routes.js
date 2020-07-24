import React, { Component  } from 'react'
import NavBar from 'components/NavBar'
import { Switch, Route } from 'react-router-dom'
import MapView from 'views/MapView'
import CalendarsView from 'views/CalendarsView'
import NoMatch from 'views/NoMatch'
import Modal from 'features/modal/Modal'
import 'App.css'
import { connect } from "react-redux";
import UserProfileView from "../views/UserProfileView";

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
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.modalOpen,
        modalProps: state.modal.modalProps,
    }
}

export default connect(mapStateToProps, null)(Routes)
