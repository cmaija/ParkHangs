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
            component: 'ModalMapDetail',
            componentParams: {
                park,
            }
        };

        this.props.openModal(modalProps);

    };

    render() {
        return (
            <div>
                <img alt="map-marker" src={MarkerIcon}/>
                <div className="marker" onClick={() => {
                    this.handleSelect(this.props.park)
                }}
                >
                    {/*TODO: should we display the name of the park*/}
                    {this.props.park.name}
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => ({
    openModal: (modalProps) => dispatch(openModal(modalProps))
});

export default connect(null, mapDispatchToProps)(Marker);
