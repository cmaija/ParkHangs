import React from 'react'
import { connect } from 'react-redux'
import {
    addEvent,
    updateEvent } from 'features/events/eventsSlice'
import TimePicker from 'react-time-picker'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import './EventForm.css'

class EventForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eventDetail: this.props.eventDetails || null,
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
        return this.props.eventDateTime ? date.format("HH:m") : null
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

        const detail =  this.state.eventDetail || this.eventDetail();
        const eventDateTime = eventTimestamp

        if (!this.props.eventId) {
            const newEvent = {
                parkId: this.props.parkId,
                details: detail,
                eventDateTime,
            }
            this.props.addOneEvent(newEvent)
        }

        else {
            const updatedEvent = {
                eventId: this.props.eventId,
                parkId: this.props.parkId,
                details: detail,
                eventDateTime,
            }
            this.props.updateEvent(updatedEvent)
            this.props.eventChanged(this.props.eventId, detail, eventTimestamp)
        }
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
    addOneEvent: (newEvent) => dispatch(addEvent(newEvent)),
    updateEvent: (updatedEvent) => dispatch(updateEvent(updatedEvent))
})

export default connect(null, mapDispatchToProps)(EventForm);
