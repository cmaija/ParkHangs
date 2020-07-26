import React from 'react'
import 'features/modal/ModalEventDetail.css'
import moment from 'moment'
import { connect } from 'react-redux'
import { deleteEvent } from 'features/events/eventsSlice'
import { toggleSavedEvent } from 'features/users/userSlice'
import { closeModal } from 'features/modal/modalSlice'
import EventForm from 'components/EventForm'
import LoadingSpinner from 'components/LoadingSpinner'
import ShareCalendar from 'components/ShareCalendar'
import FilledHeartIcon from 'assets/icons/heart-filled.svg'
import NoFilledHeartIcon from 'assets/icons/heart-no-fill.svg'

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

    favouriteEvent = (eventId) => {
        this.props.saveEvent(this.props.user, eventId)
    }

    isFavorited = (event) => {
        if (this.props.user) {
            return this.props.user.savedEvents && this.props.user.savedEvents.includes(event._id)
        }
        return false
    }

    getCreatedTime = (date) => {
        return moment.unix(date).format("YYYY/MM/DD hh:MM a");
    }

    getExportedTime = (date) => {
        let formattedDate = moment.unix(date).format("YYYYMMDDTHHmmssZ");
        return formattedDate.replace("+00:00", "Z");
    }

    favoritedEventIcon = (isFavorited) => {
        if (isFavorited) {
            return <img
                        alt="filled heart"
                        className="filledHeart"
                        src={FilledHeartIcon} />
        }
        return <img
                    alt="empty heart"
                    className="emptyHeart"
                    src={NoFilledHeartIcon} />
    }

    descriptionTab = (event, formattedStart, formattedEnd) => {
        return (
            <div className="ModalEventDetail-description">
                <div className="ModalEventDetail-description-section">
                    <span>{event.favoritesCount || 0} people have favorited this event</span>
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
        const parkStrNum = this.props.parks.find(park => park._id === event.parkId).streetNumber
        const parkStrName = this.props.parks.find(park => park._id === event.parkId).streetName
        const isFavorited = this.isFavorited(event)

        let newEvent = {
            title: event.details,
            description: event.details,
            location: parkStrNum + " " + parkStrName + " BC, Canada",
            startTime: this.getExportedTime(event.eventDateTime),
            endTime:  this.getExportedTime(event.eventEndDateTime)
        }

        const favoritedEventIcon = this.favoritedEventIcon(isFavorited)

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
                            {
                                this.props.user != null &&
                                <button
                                    onClick={() => this.favouriteEvent(event._id)}
                                    className="ModalEventDetail-actionButton">
                                    {
                                        favoritedEventIcon
                                    }
                                </button>
                            }
                            <ShareCalendar event={newEvent}/>
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
    saveEvent: (user, eventId) => dispatch(toggleSavedEvent(user, eventId)),
    closeModal: () => dispatch(closeModal())
})

const mapStateToProps = (state) => ({
    events: state.events.flattenedEvents,
    updatingEvent: state.events.updatingEvent,
    parks: state.parks.parks,
    user: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalEventDetail);
