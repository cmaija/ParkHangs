import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from 'features/parks/parksSlice'
import TimePicker from 'react-time-picker'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import './AddEventForm.css'
import apis from '../api/index'

class AddUpdateEventForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eventDetail: this.props.detail || null,
            eventTime: this.eventTime(),
            eventDate: this.eventDate(),
        }
    }

    eventTime = () => {
        return this.props.eventDateTime ? moment(this.props.eventDateTime).format("hh:m a") : null
    }

    eventDate = () => {
        return this.props.eventDateTime || this.props.currentDate
    }

    parsedEventDate = () => {
        return moment(this.state.eventDate).format("D MM YY")
    }

    isNewEvent = () => {
        return !this.props.eventDateTime
    }

    handleEventTimeChange = (time) => {
        this.setState({eventTime: time})
    }

    handleUpdateDetails = (event) => {
        this.setState({
            eventDetail: event.target.value
        })
    }

    handleUpdateDate = (date) => {
        this.setState({ eventDate: date })
    }

    handleAddEvent = (event) => {
        event.preventDefault()
        const eventTimestamp = moment(`${this.state.eventTime} ${this.parsedEventDate()}`, 'hh:mm D MM YY').unix()
        // const newEvent = {
        //     eventDetail: this.state.eventDetail,
        //     eventDateTime: eventTimestamp,
        // }
        const detail =  this.state.eventDetail;
        const eventDateTime =  eventTimestamp;

        // ADD/UPDATE EVENT DISPATCH GOES HERE!
        if (this.isNewEvent()) {
           this.props.addOneEvent(this.props.parkId, detail, eventDateTime)
        }
        // else {
        //    this.props.updateEvent(this.props.parkId, event)
        // }

        console.log("event added")
    }

    render() {
        const newEvent = this.isNewEvent()
        return(
            <div className="EventForm">
                <span>Add New Event</span>
                <form className="EventForm">
                    {
                        !newEvent && <div className="formsection date">
                            <label htmlFor="eventDate">Date:</label>
                            <Calendar id="eventDate" onChange={this.handleUpdateDate}/>
                        </div>
                    }
                    <div className="formsection time">
                        <label htmlFor="eventTime">Time:</label>
                        <TimePicker
                            onChange={this.handleEventTimeChange}
                            id="eventTime"
                            disableClock={true}
                            value={this.state.eventTime}/>
                    </div>
                    <div className="formsection details">
                        <label htmlFor="eventDetail">Details: </label>
                        <textarea
                            onChange={this.handleUpdateDetails}
                            id="eventDetail"/>
                    </div>
                </form>
                <button className={"submit-message-button leftButton"}
                        onClick={this.handleAddEvent}>
                    <span>{this.isNewEvent ? 'Create Event' : 'Update Event'}</span>
                </button>
            </div>)

    }
}

const mapDispatchToProps = (dispatch) => ({
    addEventToPark: (parkId, event) => dispatch(addEvent(parkId, event)),
    addOneEvent: (parkId, details, eventDateTime) => dispatch(apis.addEvent(parkId, details, eventDateTime))
})

export default connect(null, mapDispatchToProps)(AddUpdateEventForm);
