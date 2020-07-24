import React from 'react'
import 'features/modal/ModalEventDetail.css'
import moment from 'moment'
import { connect } from 'react-redux'
import { deleteEvent } from 'features/events/eventsSlice'
import { closeModal } from 'features/modal/modalSlice'
import { cloneDeep } from 'lodash'
import EventForm from 'components/EventForm'
import LoadingSpinner from 'components/LoadingSpinner'

class ModalEventDetail extends React.Component {

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

    deleteEvent = (parkId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            this.props.deleteOneEvent(this.props.eventId, parkId)
            this.props.closeModal()
        }
    }

    getCreatedTime = (date) => {
        return moment.unix(date).format("YYYY/MM/DD hh:MM a");
    }

    descriptionTab = (event, formattedStart, formattedEnd) => {
        return (
            <div className="ModalEventDetail-description">
                <div className="ModalEventDetail-description-section">
                    <span>{event.favorites || 0} people have favorited this event</span>
                </div>
                <div className="ModalEventDetail-description-section">
                    <span>{`${formattedStart} to ${formattedEnd}`}</span>
                </div>
                <div className="ModalEventDetail-description-section">
                    <span>{event.details}</span>
                </div>
                <div className="ModalEventDetail-description-section">
                </div>
            </div>
        )
    }

    commentsTab = (event) => {
        return (
            <div> comments </div>
        )
    }

    editTab = (event) => {
        const loadingState = (
            <div className="ModalEventDetail-updatingEvent">
                <LoadingSpinner />
            </div>
        )
        const eventForm = (
            <div className="AddEventForm">
                <EventForm
                    event={event}
                    eventDateTime={event.eventDateTime}
                    eventEndDateTime={event.eventEndDateTime}
                    eventDetails={event.details}
                    eventId={event._id}
                    showDayPicker={false} />
            </div>
        )
        return this.props.updatingEvent ? loadingState : eventForm
    }

    render () {
        const event = this.props.events.find(event => event._id === this.props.eventId)
        const parkName =  this.props.parks.find(park => park._id === event.parkId).name
        const eventStart = this.eventStartTime(event.eventDateTime)
        const formattedEnd = this.eventEndTime(event.eventEndDateTime)

        let currentTab

        if (this.state.currentTab === 'edit') {
            currentTab = this.editTab(event)
        } else if (this.state.currentTab === 'comments') {
            currentTab = this.commentsTab(event)
        } else {
            currentTab = this.descriptionTab(event, eventStart, formattedEnd)
        }

        return (
            <div className="detailed-content-main modal-card">
                <div className="ModalEventDetail-header">
                    <div className="ModalEventDetail-Title">
                        <span className="ModalEventDetail-date">{`${eventStart}`}</span>
                        <span className="ModalEventDetail-parkname">{`${parkName}`}</span>
                    </div>
                    <div className="ModalEventDetail-divider"></div>
                    <div className="ModalEventDetail-toolbar">
                        <div className="ModalEventDetail-leftToolbar">
                            <div className={
                                `${this.state.currentTab === 'description' ? 'tab-selected' : ''} ${'ModalEventDetail-tabSelector'}`}
                                onClick={() => this.selectTab('description')}>
                                <span className="ModalEventDetail-tabName">Description</span>
                            </div>
                            <div className={
                                `${this.state.currentTab === 'comments' ? 'tab-selected' : ''} ${'ModalEventDetail-tabSelector'}`}
                                onClick={() => this.selectTab('comments')}>
                                <span className="ModalEventDetail-tabName">Comments</span>
                            </div>
                            <div className={
                                `${this.state.currentTab === 'edit' ? 'tab-selected' : ''} ${'ModalEventDetail-tabSelector'}`}
                                onClick={() => this.selectTab('edit')}>
                                <span className="ModalEventDetail-tabName">Edit Event</span>
                            </div>
                        </div>
                        <div className="ModalEventDetail-rightToolbar">
                            <button className="ModalEventDetail-actionButton">Favourite</button>
                            <button className="ModalEventDetail-actionButton">Share</button>
                            <button
                                className="ModalEventDetail-actionButton"
                                onClick={() => this.deleteEvent(event.parkId)}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="ModalEventDetail-divider"></div>
                <div className="ModalEventDetail-Body">
                    {currentTab}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteOneEvent: (eventId, parkId) => dispatch(deleteEvent(eventId, parkId)),
    closeModal: () => dispatch(closeModal())
})

const mapStateToProps = (state) => ({
    events: state.events.flattenedEvents,
    updatingEvent: state.events.updatingEvent,
    parks: state.parks.parks,
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalEventDetail);
