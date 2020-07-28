import React, { Component } from 'react';
import Map from '../components/Map.js';
import './MapView.css';
import { connect } from 'react-redux'


class MapView extends Component {

    render() {
        return (
            <div className="MapView">
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
