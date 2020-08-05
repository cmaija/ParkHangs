import React, {Component} from 'react';
import {connect} from 'react-redux';
import { openModal } from 'features/modal/modalSlice'
import { selectPark } from 'features/parks/parksSlice'
import GoogleMap from 'components/GoogleMap'

class Map extends Component {

    static defaultProps = {
        zoom: 16
    };

    defaultLocation = {
        lat: 49.242140,
        lng: -123.112158,
    }

    handleSelect = (park) => {
        this.props.selectPark(park._id)
        const modalProps = {
            component: 'ModalParkDetail',
            componentParams: {
                park,
                parkId: park._id
            }
        };

        this.props.openModal(modalProps);

    }

    render() {
        const parks = this.props.parksHaveBeenQueried ? this.props.queriedParks : this.props.parks
        const center = this.props.userLocation ? this.props.userLocation : this.defaultLocation

        return (
            <div className="google-map-container">
                <GoogleMap
                    style={{height: '600px', width: '90%', margin: 'auto'}}
                    parks={parks}
                    userLocation={center}
                    handleSelect={this.handleSelect}/>
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

const mapDispatchToProps = (dispatch) => ({
    selectPark: (parkId) => dispatch(selectPark(parkId)),
    openModal: (modalProps) => dispatch(openModal(modalProps))
})


export default connect(mapStateToProps, mapDispatchToProps)(Map)
