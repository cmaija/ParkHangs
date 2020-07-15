import React from 'react'
import { connect } from 'react-redux'
import TimePicker from 'react-time-picker'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import './EventForm.css'
import apis from '../api/index'

class EventForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            eventDetail: this.props.eventDetails || null,
            eventStartTime: this.eventStartTime(),
            eventEndTime: this.eventEndTime(),
            eventDate: this.eventDate(),
        }
    }

    eventDetail = () => {
        return this.props.eventDetails || ''
    }

    parsedEventStartTime = () => {
        return this.state.eventStartTime || this.eventStartTime()
    }

    parsedEventEndTime = () => {
        return this.state.eventEndTime || this.eventEndTime()
    }

    eventStartTime = () => {
        const date = this.convertToMoment(this.props.eventDateTime)
        return this.props.eventDateTime ? date.format("HH:m") : null
    }

    eventEndTime = () => {

        if (this.props.eventEndDateTime != null) {
            const date = this.convertToMoment(this.props.eventEndDateTime)
            return this.props.eventEndDateTime ? date.format("HH:m") : null
        } else {
            return null;
        }
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

    handleEventStartTimeChange = (time) => {
        this.setState({eventStartTime: time})
    }

    handleEventEndTimeChange = (time) => {
        this.setState({eventEndTime: time})
    }

    handleUpdateDetails = (event) => {
        this.setState({
            eventDetail: event.target.value
        })
    }

    handleUpdateDate = (date) => {
        this.setState({eventDate: date})
    }

    handleAddEvent = (event) => {
        event.preventDefault()

        const eventStartTimestamp = moment(`${this.parsedEventStartTime()} ${this.parsedEventDate()}`, 'hh:mm D MM YY').unix()

        let eventEndTimestamp;

        if (this.parsedEventEndTime() != null) {
            eventEndTimestamp = moment(`${this.parsedEventEndTime()} ${this.parsedEventDate()}`, 'hh:mm D MM YY').unix()
        }

        const detail = this.state.eventDetail || this.eventDetail();

        // ADD/UPDATE EVENT DISPATCH GOES HERE!
        if (!this.props.eventId) {
            this.props.addOneEvent(this.props.parkId, detail, eventStartTimestamp, eventEndTimestamp)
        } else {
            this.props.updateEvent(this.props.eventId, this.props.parkId, detail, eventStartTimestamp, eventEndTimestamp)
            this.props.eventChanged(this.props.eventId, detail, eventStartTimestamp, eventEndTimestamp)
        }
    }

    render() {
        const eventDate = this.eventDate()
        const eventStartTime = this.eventStartTime()
        const eventEndTime = this.eventEndTime()

        const eventDetail = this.eventDetail()
        const isNewEvent = this.isNewEvent()
        const showCalendar = this.showCalendar()

        return (
            <div className="EventForm">
                <span>{this.isNewEvent ? 'Add New Event' : 'Edit Event'}</span>
                <form className="EventForm">
                    {
                        showCalendar && <div className="formsection date">
                            <label htmlFor="eventDate">Date:</label>
                            <Calendar id="eventDate" value={eventDate} onChange={this.handleUpdateDate}/>
                        </div>
                    }
                    <div className="formsection time">
                        <label htmlFor="eventTime">Event Start Time:</label>
                        <TimePicker
                            onChange={this.handleEventStartTimeChange}
                            id="eventStartTime"
                            disableClock={true}
                            value={eventStartTime}/>
                    </div>
                    <div className="formsection time">
                        <label htmlFor="eventTime">Event End Time: (optional)</label>
                        <TimePicker
                            onChange={this.handleEventEndTimeChange}
                            id="eventEndTime"
                            disableClock={true}
                            value={eventEndTime}/>
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
    addOneEvent: (parkId, details, createdTime, eventStartTime, eventEndTime) => dispatch(apis.addEvent(parkId, details, createdTime, eventStartTime, eventEndTime)),
    updateEvent: (eventId, parkId, details, eventStartTime, eventEndTime) => dispatch(apis.updateEvent(eventId, parkId, details, eventStartTime, eventEndTime))
})

export default connect(null, mapDispatchToProps)(EventForm);
