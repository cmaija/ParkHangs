import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux';
import Marker from '../components/Marker.js'
import { fetchParks } from 'features/parks/parksSlice'

class SimpleMap extends Component {

    static defaultProps = {
        center: {
            lat: 49.28,
            lng: -123.12
        },
        zoom: 12
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '500px', width: '75%', margin: 'auto'}}>
                <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_MAP_API_KEY}}
                                defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}>
                    {this.props.parks.map((park) => {
                            return <Marker key={park._id} park={park}
                                           lat={park.googleMapsLatLon[0]}
                                           lng={park.googleMapsLatLon[1]}/>
                        }
                    )}

                </GoogleMapReact>
            </div>
        );
    }

    componentDidMount = async () => {
        this.props.getAllParks()
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllParks: () => dispatch(fetchParks())
})

const mapStateToProps = (state) => { //name is by convention
    return {
        parks: state.parks.parks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);
