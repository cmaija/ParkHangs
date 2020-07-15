import React, { Component } from 'react';
import Map from '../components/Map.js';
import './MapView.css';
import { fetchEvents } from 'features/events/eventsSlice'
import { connect } from 'react-redux'


class MapView extends Component {
    componentDidMount = async () => {
        await this.props.getAllEvents()
        console.log('done!')
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
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
