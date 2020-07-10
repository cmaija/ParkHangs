import React, { Component } from 'react';
import Map from '../components/Map.js';
import './MapView.css';
import apis from '../api/index';
import { connect } from 'react-redux'
import { addSortedEvents } from 'features/parks/parksSlice';


class MapView extends Component {

  componentDidMount = async () => {
    await this.props.getAllEvents()
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
        events: state.parks.events,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllEvents: () => dispatch(apis.fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
