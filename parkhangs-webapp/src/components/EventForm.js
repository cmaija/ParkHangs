import React from 'react'
import {connect} from 'react-redux'
import {
    addEvent,
    updateEvent
} from 'features/events/eventsSlice'
import TimePicker from 'react-time-picker'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import './EventForm.css'
import {closeModal} from 'features/modal/modalSlice';


class EventForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            eventTitle: this.props.eventTitle || null,
            eventDetail: this.props.eventDetails || null,
            eventStartTime: this.eventStartTime(),
            eventEndTime: this.eventEndTime(),
            eventDate: this.dayPickerDateFormat(),
            parkId: this.props.parkId || null,
        }
    }

    eventTitle = () => {
        return this.props.eventTitle || ''
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
        return this.props.eventDateTime ? date.format("HH:mm") : null
    }

    eventEndTime = () => {
        if (this.props.eventEndDateTime != null) {
            const date = this.convertToMoment(this.props.eventEndDateTime)
            return this.props.eventEndDateTime ? date.format("HH:mm") : null
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
        if (this.props.eventDateTime) {
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

    showDatePicker = () => {
        return this.props.showDatePicker
    }

    dayPickerDateFormat = () => {

        if (this.props.eventDateTime) {
            let date = new Date(this.props.eventDateTime)
            console.log("moment:" + moment.unix(this.props.eventDateTime).format("YYYYMMDDTHHmmssZ");
            return date
        }

        return null
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


    handleUpdateTitle = (event) => {
        this.setState({
            eventTitle: event.target.value
        })
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

        let eventEndDateTime

        if (this.parsedEventEndTime() != null) {
            eventEndDateTime = moment(`${this.parsedEventEndTime()} ${this.parsedEventDate()}`, 'hh:mm D MM YY').unix()
        }

        const title = this.state.eventTitle || this.eventTitle
        const detail = this.state.eventDetail || this.eventDetail()

        if (!this.props.eventId) {

            const newEvent = {
                parkId: this.state.parkId,
                title: title,
                details: detail,
                eventDateTime: eventStartTimestamp,
                eventEndDateTime: eventEndDateTime,
            }

            this.props.addOneEvent(this.props.user, newEvent)

        } else {

            const updatedEvent = {
                eventId: this.props.eventId,
                title: title,
                details: detail,
                eventDateTime: eventStartTimestamp,
                eventEndDateTime: eventEndDateTime,
            }

            //console.log(moment(`${this.parsedEventStartTime()} ${this.parsedEventDate()}`, 'hh:mm D MM YY'));

            this.props.updateEvent(updatedEvent)

        }

        this.props.closeModal();
    }

    handleUpdateSelectedPark = (event) => {

        this.setState({
            parkId: event.target.value
        });

    }

    sortParkNamesAlphabetically = () => {
        return this.props.parks.slice().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    }

    render() {
        const eventDate = this.dayPickerDateFormat()
        const eventStartTime = this.eventStartTime()
        const eventEndTime = this.eventEndTime()

        const eventTitle = this.eventTitle()
        const eventDetail = this.eventDetail()
        const isNewEvent = this.isNewEvent()
        const showCalendar = this.showCalendar()

        return (
            <div className="EventForm">
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
                            value={eventStartTime}
                            clearIcon={null}/>
                    </div>
                    <div className="formsection time">
                        <label htmlFor="eventTime">Event End Time:</label>
                        <TimePicker
                            onChange={this.handleEventEndTimeChange}
                            id="eventEndTime"
                            disableClock={true}
                            value={eventEndTime}
                            clearIcon={null}/>
                    </div>
                    <div className="formsection details">
                        <label htmlFor="eventDetail">Title: </label>
                        <textarea
                            onChange={this.handleUpdateTitle}
                            id="eventTitle"
                            defaultValue={eventTitle}/>
                    </div>
                    <div className="formsection details">
                        <label htmlFor="eventDetail">Details: </label>
                        <textarea
                            onChange={this.handleUpdateDetails}
                            id="eventDetail"
                            defaultValue={eventDetail}/>
                    </div>
                    {
                        this.props.showParkPicker &&
                        <div className="formsection park">
                            <label htmlFor="eventPark">Select Park</label>
                            <select onChange={this.handleUpdateSelectedPark} name="Select Park" id="eventPark">
                                {
                                    this.sortParkNamesAlphabetically().map((park) => {
                                        return <option
                                            key={park._id}
                                            value={park._id}>{park.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    }
                </form>
                <button className={"submit-message-button leftButton"}
                        onClick={this.handleAddEvent}>
                    <span>{isNewEvent ? 'Create Event' : 'Update Event'}</span>
                </button>
            </div>)

    }
}

const mapDispatchToProps = (dispatch) => ({
    addOneEvent: (user, newEvent) => dispatch(addEvent(user, newEvent)),
    updateEvent: (updatedEvent) => dispatch(updateEvent(updatedEvent)),
    closeModal: () => dispatch(closeModal(false)),
})

const mapStateToProps = (state) => ({
    parks: state.parks.parks,
    user: state.user.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
