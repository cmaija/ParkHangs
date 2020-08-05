import React, {Component} from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import Marker from '../components/Marker'

class SimpleMap extends Component {
    static defaultProps = {
        zoom: 16
    }

    defaultLocation = {
        lat: 49.242140,
        lng: -123.112158,
    }

    mapStyles = {
        width: '100%',
        height: '100%'
    }

    render() {
        const parks = this.props.parks
        return (
            <Map
                    google={this.props.google}
                    initialCenter={this.props.center}
                    center={this.props.center}
                    style={this.mapStyles}
                    zoom={this.props.zoom}>
                    {
                        parks && parks.length > 0 &&
                        parks.map((park) => {
                            return <Marker key={park._id} park={park}
                                           lat={park.googleMapsLatLon[1]}
                                           lng={park.googleMapsLatLon[0]}/>
                        }
                    )}

            </Map>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(SimpleMap)
