import React, {Component} from 'react'
import { selectPark } from 'features/parks/parksSlice.js'
import { openModal } from 'features/modal/modalSlice.js'
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
        this.props.selectParkID(park);
        const modalProps = {
            component: 'ModalMapDetail',
            componentParams: {
                park,
            }
        }

        this.props.openModal(modalProps)

    }

    render() {
        return (
            <div>
                <img alt="map-marker" src={MarkerIcon}/>
                <div className="marker" onClick={() => {
                    this.handleSelect(this.props.text)
                }}
                >
                    {this.props.park.parkName}
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => { //name is by convention
    return {selected: state.parks.selectedPark}; //now it will appear as props
}

const mapDispatchToProps = (dispatch) => ({
    selectParkID: (parkID) => dispatch(selectPark(parkID)),
    openModal: (modalProps) => dispatch(openModal(modalProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
