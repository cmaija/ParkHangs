import React, {Component} from 'react'
import {
    selectPark,
    deleteEvent } from '../features/parks/parksSlice.js'
import { openModal } from '../features/modal/modalSlice.js'
import MarkerIcon from '../images/marker.png'
import {connect} from "react-redux"

class Marker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect (park) {
        this.props.selectParkID(park);

        const props = {
            component: 'ModalMapDetail',
            componentParams: {
                park,
            }
        }

        this.props.openModal(props)

    }

    render() {
        return (
            <div>
                <img src={MarkerIcon}/>
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
    deleteEventFromPark: (parkId, eventId) => dispatch(deleteEvent(parkId, eventId)),
    openModal: () => dispatch(openModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
