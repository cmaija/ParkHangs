import React, {Component} from 'react'
import {openModal} from 'features/modal/modalSlice.js'
import MarkerIcon from 'assets/icons/marker.png'
import {connect} from "react-redux"
import { selectPark } from 'features/parks/parksSlice'

class Marker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        };
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

    };

    render() {
        return (
            <div>
                <div className="marker" onClick={() => {
                    this.handleSelect(this.props.park)
                }}
                >
                  <img alt="map-marker" src={MarkerIcon}/>
                </div>
            </div>
        );
    };
}



const mapDispatchToProps = (dispatch) => ({
    selectPark: (parkId) => dispatch(selectPark(parkId)),
    openModal: (modalProps) => dispatch(openModal(modalProps))
});

export default connect(null, mapDispatchToProps)(Marker);
