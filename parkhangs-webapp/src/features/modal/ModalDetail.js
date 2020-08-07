import React from 'react'
import 'features/modal/ModalDetail.css'
import moment from 'moment'
import {connect} from "react-redux"
import {deleteEvent} from 'features/events/eventsSlice'
import {cloneDeep} from 'lodash'
import EventForm from "../../components/EventForm";

class ModalDetail extends React.Component {

    constructor(props) {
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

    render() {
        const date = this.date()
        return (
            <div className="detailed-content-main modal-card">
                <span className="ModalDetail-Title">{`${this.props.park.name}: ${date}`}</span>
                <div className="ModalDetail-Body">
                    <div className="EventsList">
                        <span className="EventsList-Title">Events:</span>
                        <div className="EventsList-populated">
                            {
                                this.state.eventsOnCurrentDate.length > 0 ?

                                    <table>
                                        <thead>
                                        <tr>
                                            <td>
                                                <b>Created At:</b>
                                            </td>
                                            <td>
                                                <b>Created by:</b>
                                            </td>
                                            <td>
                                                <b>Title:</b>
                                            </td>
                                            <td>
                                                <b>Details:</b>
                                            </td>
                                            <td>
                                                <b>Starts at:</b>
                                            </td>
                                            <td>
                                                <b>Ends at:</b>
                                            </td>
                                            <td>
                                                <b>Delete</b>
                                            </td>
                                            <td>
                                                <b>Edit</b>
                                            </td>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            this.state.eventsOnCurrentDate.map((event) => {
                                                return <tr key={event._id}>
                                                    <td>
                                                        {this.getCreatedTime(event.createdDateTime)}
                                                    </td>
                                                    <td>
                                                        {event.creatorName}
                                                    </td>
                                                    <td>
                                                        {event.title}
                                                    </td>
                                                    <td>
                                                        {event.details}
                                                    </td>
                                                    <td>
                                                        {this.getEventTime(event.eventDateTime)}
                                                    </td>
                                                    <td>
                                                        {
                                                            this.getEventTime(event.eventEndDateTime) != null ?

                                                                <div className="event-datetime">
                                                                    {this.getEventTime(event.eventEndDateTime)}
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </td>
                                                    <td>
                                                        <button onClick={() => this.editEvent(event)}>Edit</button>

                                                    </td>
                                                    <td>
                                                        <button onClick={() => this.deleteEvent(event._id)}>delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            })

                                        }

                                        </tbody>

                                    </table>
                                    :
                                    <div>
                                        There are no events for this date.
                                    </div>
                            }

                        </div>
                    </div>
                    <div className="AddEventForm">
                        <EventForm
                            event={this.state.eventToEdit ? this.state.eventToEdit : null}
                            eventDateTime={this.state.eventToEdit ? this.state.eventToEdit.eventDateTime : false}
                            eventEndDateTime={this.state.eventToEdit ? this.state.eventToEdit.eventEndDateTime : null}
                            eventTitle={this.state.eventToEdit ? this.state.eventToEdit.title : false}
                            eventDetails={this.state.eventToEdit ? this.state.eventToEdit.details : false}
                            eventId={this.state.eventToEdit ? this.state.eventToEdit._id : false}
                            parkId={this.props.park._id}
                            currentDate={this.props.date}
                            showDayPicker={false}
                            eventChanged={(eventId, title, detail, eventTimestamp, eventEndTimestamp) => this.updateEvent(eventId, title, detail, eventTimestamp, eventEndTimestamp)}/>
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    deleteOneEvent: (eventId, parkId) => dispatch(deleteEvent(eventId, parkId))
})

export default connect(null, mapDispatchToProps)(ModalDetail);
