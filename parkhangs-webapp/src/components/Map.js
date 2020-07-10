import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux';
import Marker from '../components/Marker.js'
import apis from '../api/index'

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

        //await this.props.getAllParks().then().catch();

        this.props.getAllParks();

        // try {
        //     let resultAction = await this.props.getAllParks();
        //     console.log("resultaction:" + resultAction);
        //     const parks = unwrapResult(resultAction);
        //     console.log('parks:' + parks);
        // } catch (err) {
        //     console.log('error with componentdidmount:' + err);
        // }
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

const mapDispatchToProps = (dispatch) => ({
    getAllParks: () => dispatch(apis.fetchParks())
});

const mapStateToProps = (state) => { //name is by convention
    return {parks: state.parks.parks}; //now it will appear as props
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);
