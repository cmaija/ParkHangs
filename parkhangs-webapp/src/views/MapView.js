import React, { Component } from 'react';
import Map from '../components/Map.js';
import './MapView.css';
import { fetchEvents } from 'features/events/eventsSlice'
import { fetchParkComments } from 'features/comments/commentSlice'
import { connect } from 'react-redux'


class MapView extends Component {
    componentDidMount = async () => {
        await this.props.getAllEvents()
        await this.props.getAllComments()
    }


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

const mapDispatchToProps = (dispatch) => ({
    getAllEvents: () => dispatch(fetchEvents()),
    getAllComments: () => dispatch(fetchParkComments())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
