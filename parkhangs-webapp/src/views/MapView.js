import React, { Component } from 'react';
import Map from '../components/Map.js';
import './MapView.css'

class MapView extends Component {
    render() {
        return (
            <div className="MapView">
                <Map/>
            </div>
        );
    }
}

export default MapView;
