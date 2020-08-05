import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux';
import Marker from '../components/Marker.js'

class SimpleMap extends Component {

    static defaultProps = {
        center: {
            lat: 49.28,
            lng: -123.12
        },
        zoom: 12
    };

    render() {
        const parks = this.props.parksHaveBeenQueried ? this.props.queriedParks : this.props.parks
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '600px', width: '90%', margin: 'auto'}}>
                <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_MAP_API_KEY}}
                                defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}>
                    {
                        parks && parks.length > 0 &&
                        parks.map((park) => {
                            return <Marker key={park._id} park={park}
                                           lat={park.googleMapsLatLon[1]}
                                           lng={park.googleMapsLatLon[0]}/>
                        }
                    )}

                </GoogleMapReact>
            </div>
        );
    }
}



const mapStateToProps = (state) => { //name is by convention
    return {
        parks: state.parks.parks,
        queriedParks: state.parks.queriedParks,
        parksHaveBeenQueried: state.parks.parksHaveBeenQueried
    }
}

export default connect(mapStateToProps, null)(SimpleMap);
