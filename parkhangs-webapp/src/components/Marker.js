import React, {Component} from 'react'
import {selectPark} from 'features/parks/parksSlice.js'
import {openModal} from 'features/modal/modalSlice.js'
import MarkerIcon from 'assets/icons/marker.png'
import {connect} from "react-redux"

class Marker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        };
    }

    handleSelect = (park) => {
        const modalProps = {
            component: 'ModalParkDetail',
            componentParams: {
                park,
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
    openModal: (modalProps) => dispatch(openModal(modalProps))
});

export default connect(null, mapDispatchToProps)(Marker);
