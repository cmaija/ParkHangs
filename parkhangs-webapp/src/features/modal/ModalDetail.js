import React from 'react'
import 'features/modal/ModalDetail.css'
import moment from 'moment'
import { connect } from "react-redux"
import apis from 'api/index'
import { cloneDeep } from 'lodash'
import EventForm from "../../components/EventForm";

class ModalDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            eventsOnCurrentDate: this.props.events,
            eventToEdit: null
        }
    }

    date = () => {
        const momentDate = moment(this.props.date)
        return momentDate.format("MMMM Do YYYY")
    }

    editEvent = (eventToEdit) => {
        this.setState({eventToEdit})
    }

    deleteEvent = async (eventId) => {
        try {
            await this.props.deleteOneEvent(eventId, this.props.park._id)
            console.log(this.state.eventsOnCurrentDate)
            let newEventsArray = this.state.eventsOnCurrentDate.filter(event => event._id !== eventId)
            console.log(newEventsArray)
            this.setState({ eventsOnCurrentDate: newEventsArray })
        } catch (error) {
            console.error(error)
        }

    }

    updateEvent = (eventId, eventDetail, eventTimestamp) => {
        const newEventsArray = cloneDeep(this.state.eventsOnCurrentDate)
        let eventIndex = newEventsArray.findIndex(event => event._id === eventId)
        newEventsArray[eventIndex].details = eventDetail
        newEventsArray[eventIndex].eventDateTime = `${eventTimestamp}`
        this.setState({eventsOnCurrentDate: newEventsArray, eventToEdit: null})
    }

    getEventTime = (date) => {
        return moment.unix(date).format("hh:MM a");
    }

    getCreatedTime = (date) => {
        return moment.unix(date).format("YYYY/MM/DD hh:MM a");
    }

    render() {
        const date = this.date()
        return (
            <div className="detailed-content-main modal-card">
                <span className="ModalDetail-Title">{`${this.props.park.name}: ${date}`}</span>
                <div className="ModalDetail-Body">
                    <div className="EventsList">
                        <span className="EventsList-Title">Events:</span>
                        <div className="EventsList-populated">
                        {   this.state.eventsOnCurrentDate.length > 0 &&
                                this.state.eventsOnCurrentDate.map((event) => {
                                    return <div className="event" key={event._id}>
                                        <div className="event-info">
                                            <div>
                                                <b>Created At:</b><br/>{this.getCreatedTime(event.createdDateTime)}
                                            </div>
                                            <div>
                                                <b>Created by:</b><br/>{event.creatorName}
                                            </div>
                                            <div className="event-details">
                                                <b>Details:</b> {event.details}
                                            </div>
                                            <div className="event-datetime">
                                                <b>Starts at:</b> {this.getEventTime(event.eventDateTime)}
                                            </div>
                                        </div>
                                        <div className="event-buttons">
                                            <button onClick={() => this.editEvent(event)}>Edit</button>
                                            <button onClick={() => this.deleteEvent(event._id)}>delete</button>
                                        </div>
                                    </div>
                                })

                        }
                        </div>
                        {
                            this.props.events.length === 0 &&
                            <span className="EventsList-empty">There are no events on this date</span>
                        }
                    </div>
                    <div className="AddEventForm">
                        <EventForm
                            event={this.state.eventToEdit ? this.state.eventToEdit : null }
                            eventDateTime={this.state.eventToEdit ? this.state.eventToEdit.eventDateTime : false}
                            eventDetails={this.state.eventToEdit ? this.state.eventToEdit.details : false}
                            eventId={this.state.eventToEdit ? this.state.eventToEdit._id : false}
                            parkId={this.props.park._id}
                            currentDate={this.props.date}
                            showDayPicker={false}
                            eventChanged={(eventId, detail, eventTimestamp) => this.updateEvent(eventId, detail, eventTimestamp)}/>
                    </div>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => ({
    deleteOneEvent: (eventId, parkId) => dispatch(apis.deleteEvent(eventId, parkId))
})

export default connect(null, mapDispatchToProps)(ModalDetail);
