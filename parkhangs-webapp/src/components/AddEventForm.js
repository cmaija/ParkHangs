import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from 'features/parks/parksSlice'
import TimePicker from 'react-time-picker'

class AddUpdateEventForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eventDetail: this.props.detail || null,
            eventTime: this.props.eventDateTime || null
        }
    }

    isNewEvent = () => {
        return !!this.props._id
    }

    handleAddEvent(event) {
        event.preventDefault();

        let newEvent = {
            id: Date.now().toLocaleString(),
            parkName: this.props.park.parkName,
            eventTime: new Date().toLocaleString()
        };

        this.props.addEventToPark(this.props.park.id, newEvent);
    }

    render() {
        return(
            <div>
                <form className="EventForm">
                    <label for="eventTime"></label>
                    <TimePicker
                        onChange={this.handleEventTimeChange}
                        id="eventTime"
                        value={this.state.eventTime}/>
                    <label for="eventDetail">Details: </label>
                    <textarea id="eventDetail"/>
                </form>
                <button className={"submit-message-button leftButton"}
                        onClick={this.handleAddEvent}>
                    Create event!
                </button>
            </div>)

    }
}

const mapDispatchToProps = (dispatch) => ({
    addEventToPark: (parkId, event) => dispatch(addEvent(parkId, event))
})

export default connect(null, mapDispatchToProps)(AddUpdateEventForm);
