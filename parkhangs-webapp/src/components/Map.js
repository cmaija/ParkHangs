import React, {Component} from 'react';
import {connect} from 'react-redux';
import Marker from '../components/Marker.js'
import GoogleMap from 'components/GoogleMap'

class SimpleMap extends Component {

    static defaultProps = {
        zoom: 16
    };

    defaultLocation = {
        lat: 49.242140,
        lng: -123.112158,
    }

    render() {
        const parks = this.props.parksHaveBeenQueried ? this.props.queriedParks : this.props.parks
        const center = this.props.userLocation ? this.props.userLocation : this.defaultLocation

        return (
            // Important! Always set the container height explicitly
            <div style={{height: '600px', width: '90%', margin: 'auto'}}>
                <GoogleMap parks={parks} userLocation={center} />
            </div>
        );
    }
}



const mapStateToProps = (state) => { //name is by convention
    return {
        parks: state.parks.parks,
        queriedParks: state.parks.queriedParks,
        parksHaveBeenQueried: state.parks.parksHaveBeenQueried,
        userLocation: state.user.userLocation,
        loadingUserLocation: state.user.loadingUserLocation,
    }
}

export default connect(mapStateToProps, null)(SimpleMap)
