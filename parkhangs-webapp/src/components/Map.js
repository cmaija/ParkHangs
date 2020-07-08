import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux';
import Marker from '../components/Marker.js'
import fetchParks from '../features/parks/parksSlice.js'
import {unwrapResult} from '@reduxjs/toolkit'

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
                <GoogleMapReact
                    bootstrapURLKeys={{key: process.env.REACT_APP_MAP_API_KEY}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {this.props.parks.map((park) => {
                            return <Marker key={park.id}
                                           lat={park.lat}
                                           lng={park.lng}
                                           text={park.parkName}
                                           events={park.events}
                                           park={park}
                            />
                        }
                    )
                    }

                </GoogleMapReact>
            </div>
        );
    }

    componentDidMount = async () => {

        //await this.props.getAllParks().then().catch();

        try {
            let resultAction = await this.props.getAllParks();
            console.log("resultaction:" + resultAction);
            const parks = unwrapResult(resultAction);
            console.log('parks:' + parks);
        } catch (err) {
            console.log('error with componentdidmount:' + err);
        }
        //
        //
        // // await this.props.getAllParks()
        // //     .then((parks) => {
        // //         const unwrappedParks = unwrapResult(parks);
        // //         console.log("unwrappedParks: " + unwrappedParks);
        // //         return unwrappedParks;
        // //     })
        // //     .catch((err) => {
        // //         console.log(err);
        // //     });
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllParks: () => { dispatch(fetchParks()) }
    }
};

const mapStateToProps = (state) => { //name is by convention
    return {parks: state.parks.parks}; //now it will appear as props
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);
