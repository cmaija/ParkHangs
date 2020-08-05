import React, {Component} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import 'components/GoogleMap.css'

class GoogleMap extends Component {
    static defaultProps = {
        zoom: 14
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
        const image = 'https://raw.githubusercontent.com/cmaija/ParkHangs/master/parkhangs-webapp/src/assets/icons/marker.png'
        return (
            <div className="google-map">
                <Map
                    containerStyle={{
                        position: 'relative',
                        height: '600px',
                    }}
                    google={this.props.google}
                    initialCenter={this.props.userLocation}
                    center={this.props.userLocation}
                    style={this.mapStyles}
                    zoom={this.props.zoom}
                    mapTypeControl={false}>
                    {
                        parks && parks.length > 0 &&
                        parks.map((park) => {
                            return <Marker
                                key={park._id}
                                park={park}
                                icon={image}
                                position={
                                   {
                                       lat: park.googleMapsLatLon[1],
                                       lng: park.googleMapsLatLon[0]
                                   }}
                                draggable={false}
                                onClick={()=> this.props.handleSelect(park)} />
                        }
                    )}
                </Map>
            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(GoogleMap)
