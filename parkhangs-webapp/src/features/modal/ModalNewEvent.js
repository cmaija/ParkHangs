import React from 'react'
import 'features/modal/ModalEventDetail.css'
import moment from 'moment'
import { connect } from 'react-redux'
import { deleteEvent } from 'features/events/eventsSlice'
import { cloneDeep } from 'lodash'
import EventForm from 'components/EventForm'

class ModalNewEvent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eventToEdit: null,
            currentTab: 'description'
        }
    }

    selectTab = (tab) => {
        this.setState({currentTab: tab})
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

    eventStartTime = (timestamp) => {
        const date = this.convertToMoment(timestamp)
        return timestamp ? date.format("MMMM Do YYYY hh:mma") : null
    }

    eventEndTime = (timestamp) => {
        if (timestamp != null) {
            const date = this.convertToMoment(timestamp)
            return timestamp ? date.format("hh:mma") : null
        } else {
            return null;
        }
    }
    editEvent = (eventToEdit) => {
        this.setState({eventToEdit})
    }

    deleteEvent = async (eventId) => {
        try {
            await this.props.deleteOneEvent(eventId, this.props.park._id)
            let newEventsArray = this.state.eventsOnCurrentDate.filter(event => event._id !== eventId)
            this.setState({eventsOnCurrentDate: newEventsArray})
        } catch (error) {
            console.error(error)
        }

    }

    updateEvent = (eventId, eventDetail, eventTimestamp, eventEndTimeStamp) => {
        const newEventsArray = cloneDeep(this.state.eventsOnCurrentDate)
        let eventIndex = newEventsArray.findIndex(event => event._id === eventId)
        newEventsArray[eventIndex].details = eventDetail
        newEventsArray[eventIndex].eventDateTime = `${eventTimestamp}`
        newEventsArray[eventIndex].eventEndDateTime = `${eventEndTimeStamp}`
        this.setState({eventsOnCurrentDate: newEventsArray, eventToEdit: null})
    }

    getEventTime = (date) => {
        if (date != null) {
            return moment.unix(date).format("hh:MM a");
        } else {
            return "";
        }
    }

    getCreatedTime = (date) => {
        return moment.unix(date).format("YYYY/MM/DD hh:MM a");
    }

    eventDate = () => {
        return this.convertToMoment(this.props.eventDateTime).format("MMMM Do YYYY")
    }


    render () {
        const selectedDate = this.eventDate()
        return (
            <div className="detailed-content-main modal-card">
                <div className="ModalEventDetail-header">
                     <div className= "ModalEventDetail-Title">
                        <span className="ModalEventDetail-AddDate">{`Add New Event on ${selectedDate}`}</span>
                    </div>
                </div>

                <div className="AddEventForm">
                    <EventForm
                        eventDateTime={this.props.selectedSlot.start}
                        showParkPicker={true}
                        eventEndDateTime={this.props.selectedSlot.end}
                        showDayPicker={false}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteOneEvent: (eventId, parkId) => dispatch(deleteEvent(eventId, parkId)),
})

const mapStateToProps = (state) => ({
    events: state.events.flattenedEvents,
    parks: state.parks.parks,
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewEvent);
