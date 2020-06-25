import React, {Component} from 'react';
import {selectPark} from '../features/parks/parksSlice.js'
import MarkerIcon from '../images/marker.png'
import AddEventForm from "./AddEventForm";
import {deleteEvent} from "../features/parks/parksSlice";
import {connect} from "react-redux";

class Marker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect() {
        this.setState({
            showDetails: true
        });
        this.props.selectParkID(this.props.text);

    }

    render() {
        return (
            <div>
                <img src={MarkerIcon}/>
                <div className="marker" onClick={() => {
                    this.handleSelect()
                }}
                >
                    {this.props.park.parkName}
                </div>

                {

                    this.state.showDetails ?

                        <div className="modal-background" style={{width: "50%"}}>
                            <div className="modal-container">
                                <div className="detailed-info modal-card">
                                    <div>
                                        <div>
                                            Name: {this.props.park.parkName}
                                        </div>
                                        <div>
                                            Lat: {this.props.park.lat}
                                        </div>
                                        <div>
                                            Lon: {this.props.park.lng}
                                        </div>
                                        Events:
                                        {
                                            this.props.park.events.map((event) => {
                                                return <div key={event.id}>
                                                    <div>
                                                        {event.parkName}
                                                    </div>
                                                    <div>
                                                        {event.eventTime}
                                                    </div>
                                                    <button onClick={() => {
                                                        this.props.deleteEventFromPark(this.props.park.id, event.id)
                                                    }}>
                                                        X
                                                    </button>
                                                </div>;
                                            })
                                        }

                                        <AddEventForm park={this.props.park}/>
                                        <button onClick={() => {
                                            this.setState({showDetails: false})
                                        }}>Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    };
}

const mapStateToProps = (state) => { //name is by convention
    return {selected: state.parks.selectedPark}; //now it will appear as props
}

const mapDispatchToProps = (dispatch) => ({
    selectParkID: (parkID) => dispatch(selectPark(parkID)),
    deleteEventFromPark: (parkId, eventId) => dispatch(deleteEvent(parkId, eventId))

});

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
