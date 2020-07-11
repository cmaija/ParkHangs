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

    eventDetail = () => {
        return this.props.eventDetails || ''
    }

    parsedEventTime = () => {
        return this.state.eventTime || this.eventTime()
    }

    eventTime = () => {
        const date = this.convertToMoment(this.props.eventDateTime)
        return this.props.eventDateTime ? date.format("hh:m") : null
    }

    convertToMoment = (date) => {
        let eventDate = date
        if (typeof eventDate === "string") {
            eventDate = parseInt(eventDate, 10)
        }

        if (eventDate / 1000000000000 < 1) {
            eventDate *= 1000
        }

        eventDate = moment(eventDate)
        return eventDate
    }

    eventDate = () => {
        if (this.props.eventDatetime) {
            return this.convertToMoment(this.props.eventDateTime)
        }
        return this.convertToMoment(this.props.currentDate)
    }

    parsedEventDate = () => {
        return moment(this.state.eventDate).format("D MM YY")
    }

    showCalendar = () => {
        return this.props.showDayPicker
    }

    isNewEvent = () => {
        return !this.props.eventId
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
        const eventTimestamp = moment(`${this.parsedEventTime()} ${this.parsedEventDate()}`, 'hh:mm D MM YY').unix()
        // const newEvent = {
        //     eventDetail: this.state.eventDetail,
        //     eventDateTime: eventTimestamp,
        // }
        const detail =  this.state.eventDetail || this.eventDetail();
        const eventDateTime =  eventTimestamp;

        // ADD/UPDATE EVENT DISPATCH GOES HERE!
        if (!this.props.eventId) {
           this.props.addOneEvent(this.props.parkId, detail, eventDateTime)
        }

        else {
            this.props.updateEvent(this.props.eventId, this.props.parkId, detail, eventTimestamp)
            this.props.updatedEvent(this.props.eventId, detail, eventTimestamp)
        }

        console.log("event added")
    }

    render() {
        const eventDate = this.eventDate()
        const eventTime = this.eventTime()
        const eventDetail = this.eventDetail()
        const isNewEvent = this.isNewEvent()
        const showCalendar = this.showCalendar()
        return(
            <div className="EventForm">
                <span>{this.isNewEvent ? 'Add New Event' : 'Edit Event' }</span>
                <form className="EventForm">
                    {
                        showCalendar && <div className="formsection date">
                            <label htmlFor="eventDate">Date:</label>
                            <Calendar id="eventDate" value={eventDate} onChange={this.handleUpdateDate}/>
                        </div>
                    }
                    <div className="formsection time">
                        <label htmlFor="eventTime">Time:</label>
                        <TimePicker
                            onChange={this.handleEventTimeChange}
                            id="eventTime"
                            disableClock={true}
                            value={eventTime}/>
                    </div>
                    <div className="formsection details">
                        <label htmlFor="eventDetail">Details: </label>
                        <textarea
                            onChange={this.handleUpdateDetails}
                            id="eventDetail"
                            defaultValue={eventDetail}/>
                    </div>
                </form>
                <button className={"submit-message-button leftButton"}
                        onClick={this.handleAddEvent}>
                    <span>{isNewEvent ? 'Create Event' : 'Update Event'}</span>
                </button>
            </div>)

    }
}

const mapDispatchToProps = (dispatch) => ({
    addOneEvent: (parkId, details, eventDateTime) => dispatch(apis.addEvent(parkId, details, eventDateTime)),
    updateEvent: (eventId, parkId, details, eventDateTime) => dispatch(apis.updateEvent(eventId, parkId, details, eventDateTime))
})

export default connect(null, mapDispatchToProps)(AddUpdateEventForm);
