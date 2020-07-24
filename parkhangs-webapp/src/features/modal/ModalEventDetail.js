import React from 'react'
import 'features/modal/ModalEventDetail.css'
import moment from 'moment'
import { connect } from 'react-redux'
import { deleteEvent } from 'features/events/eventsSlice'
import { cloneDeep } from 'lodash'
import EventForm from 'components/EventForm'
import CommentForm from 'components/CommentForm'
import { fetchEventComments } from 'features/comments/commentSlice'

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

    date = (date) => {
        const momentDate = moment.unix(date)
        const day = momentDate.format("MMMM Do YYYY")
        const time = moment.unix(date).format("hh:MMa")
        return `${day} at ${time}`
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

    descriptionTab = (event) => {
        return (
            <div className="ModalEventDetail-description">
                <div className="ModalEventDetail-description-section"></div>
                <div className="ModalEventDetail-description-section"></div>
                <div className="ModalEventDetail-description-section"></div>
                <div className="ModalEventDetail-description-section"></div>
            </div>
        )
    }

    getCommentsByEvent = () => {
      console.log(this.props.comments)
      let res = this.props.comments[this.props.eventId]
      if (res === undefined) {
          //no comments for that park, return empty array
          return [];
        } else {
          return res; //filtered array
        }
      };

    commentsTab = (event) => {
        return (
            <div className="Section">
              <div className="EventComments">
                <div>
                  <span className="SectionTitle">Event Comments</span>
                  { this.getCommentsByEvent().map((comment) => {
                    return <table>
                      <tbody>
                        <tr key={comment._id}>
                          <td>{comment.comment}</td>
                          <td>
                            <button onClick={() => {
                                this.props.deleteEventFromPark(event._id, this.props.park._id)
                              }}>
                              <b>X</b>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    })
                  }
                  <CommentForm eventId={this.props.eventId}/>
                </div>
              </div>
            </div>
        )
    }

    editTab = (event) => {
        return (
            <div className="AddEventForm">
                <EventForm
                    event={event}
                    eventDateTime={event.eventDateTime}
                    eventEndDateTime={event.eventEndDateTime}
                    eventDetails={event.details}
                    eventId={event._id}
                    showDayPicker={false}
                    eventChanged={(eventId, detail, eventTimestamp, eventEndTimestamp) => this.updateEvent(eventId, detail, eventTimestamp, eventEndTimestamp)}/>
            </div>
        )
    }

    render () {
        const event = this.props.events.find(event => event._id === this.props.eventId)
        const parkName =  this.props.parks.find(park => park._id === event.parkId).name
        const eventStart = this.date(event.eventDateTime)

        let currentTab

        if (this.state.currentTab === 'edit') {
            currentTab = this.editTab(event)
        } else if (this.state.currentTab === 'comments') {
            currentTab = this.commentsTab(event)
        } else {
            currentTab = this.descriptionTab(event)
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
                                <div>

                                </div>
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
                        </div>
                    </div>
                </div>
                <div className="ModalEventDetail-Body">
                    {currentTab}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteOneEvent: (eventId, parkId) => dispatch(deleteEvent(eventId, parkId))
})

const mapStateToProps = (state) => ({
    events: state.events.flattenedEvents,
    parks: state.parks.parks,
    comments: state.comments.commentsByEventId
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalEventDetail);
