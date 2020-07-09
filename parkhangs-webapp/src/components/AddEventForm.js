import React from "react";
import { connect } from "react-redux";
import { addEvent } from "features/parks/parksSlice"
import apis from '../api/index'

class AddEventForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {};

        this.handleAddEvent = this.handleAddEvent.bind(this);
    }

    handleAddEvent(event) {

        event.preventDefault();

        let newEvent = {
            id: Date.now().toLocaleString(),
            parkName: this.props.park.parkName,
            eventTime: new Date().toLocaleString()
        };

        this.props.addEventToPark(this.props.park.id, newEvent);

    };

    render() {
        return <div>
            <div>Add an event!</div>
            <button className={"submit-message-button leftButton"}
                    onClick={this.handleAddEvent}>
                Create event!
            </button>
        </div>

    }
}

const mapDispatchToProps = (dispatch) => ({
    addEventToPark: (parkId, event) => dispatch(addEvent(parkId, event)),
    addOneEvents: (parkId, details, eventDateTime) => dispatch(apis.addEvent(parkId, details, eventDateTime))
})

export default connect(null, mapDispatchToProps)(AddEventForm);
