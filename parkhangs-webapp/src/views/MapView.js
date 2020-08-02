import React, { Component } from 'react'
import Map from '../components/Map'
import ParkFilterToolbar from 'components/ParkFilterToolbar'
import './MapView.css'
import { connect } from 'react-redux'


class MapView extends Component {

    render() {
        return (
            <div className="MapView">
                <ParkFilterToolbar />
                <Map/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events.eventsByParkId,
        comments: state.comments.commentsByParkId
    }
}

export default connect(mapStateToProps, null)(MapView);
