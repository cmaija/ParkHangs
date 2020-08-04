import React from 'react'
import {deleteEvent} from 'features/events/eventsSlice'
import {connect} from 'react-redux'
import 'features/modal/ModalParkDetail.css'
import moment from 'moment'
import CommentForm from 'components/CommentForm'
import { deleteParkComment } from 'features/comments/commentSlice'
import NoFilledHeartIcon from 'assets/icons/heart-no-fill.svg'
import FilledHeartIcon from 'assets/icons/heart-filled.svg'
import { toggleSavedPark } from "features/users/userSlice";
import { addRating } from 'features/parks/parksSlice';
import ShareCalendar from 'components/ShareCalendar';
import LoadingSpinner from 'components/LoadingSpinner'
import EventForm from 'components/EventForm'

class ModalParkDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parkToEdit: null,
            currentTab: 'description'
        }

        this.toggleFavouritePark = this.toggleFavouritePark.bind(this);
        this.getSavedParkIcon = this.getSavedParkIcon.bind(this);

    }

    selectTab = (tab) => {
        this.setState({currentTab: tab})
    }

    getEventsByPark = () => {
        let res= this.props.events[this.props.park._id]
        if (res === undefined) {
            //no events for that park, return empty array
            return [];

        } else {
            return res; //filtered array
        }
    };

    getCommentsByPark = (park) => {
        let res = this.props.comments[park._id]
        if (res === undefined) {
            //no comments for that park, return empty array
            return [];

        } else {
            return res; //filtered array
        }
    };

    getEventTime = (date) => {
        if (date != null) {
            return moment.unix(date).format("YYYY/MM/DD hh:mm a");
        } else {
            return "";
        }
    }

    getCreatedTime = (date) => {
        return moment.unix(date).format("YYYY/MM/DD hh:MM a");
    }

    toggleFavouritePark = () => {
        this.props.toggleSavedPark(this.props.user, this.props.park._id);
    }

    getSavedParkIcon = () => {
        if (this.props.user != null) {
            if (this.props.user.savedParks.includes(this.props.park._id)) {
                return <img
                            alt="filled heart"
                            className="FilledHeartIcon"
                            src={FilledHeartIcon}
                            onClick={this.toggleFavouritePark}/>
            } else {
                return <img
                            alt="unfilled heart"
                            className="NotFillHeartIcon" src={NoFilledHeartIcon}
                            onClick={this.toggleFavouritePark}/>
            }
        }
    }

    getExportedTime = (date) => {
        let formattedDate = moment.unix(date).format("YYYYMMDDTHHmmssZ");
        return formattedDate.replace("+00:00", "Z");
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

    handleAddRating = (rating) => {
      let userToSend = 0;
      if (this.props.user != null) {
        userToSend = this.props.user._id
      }
      let ratingToSend = {
        user: userToSend,
        rating: rating
      }
      this.props.addRating(this.props.parkId, ratingToSend);
    }

    handleDeleteComment = (comment, parkId) => {
      const commentUser = comment.creatorID;
      let deletingUser = 0;
      if (this.props.user != null) {
        deletingUser = this.props.user._id
      }
      if (commentUser === deletingUser) {
        this.props.deleteCommentFromPark(comment._id, parkId)
      } else {
        alert("You cannot delete another user's comment!")
      }
    }

    getAverageRating = (park) => {
        return park.averageRating ? park.averageRating : 0
    }

    descriptionTab = (park) => {
        return (
            <div className="ModalParkDetail-description">
                        <div className="ParkLocationDetails">
                            <div>
                                Address: {park.streetNumber + " " + park.streetName}
                            </div>
                            <div>
                                Lat: {park.googleMapsLatLon[0]}
                            </div>
                            <div>
                                Lon: {park.googleMapsLatLon[1]}
                            </div>
                        </div>
                        <div className="OtherDetails">
                            <div>
                                Neighbourhood Name: {park.neighbourhoodName}
                            </div>
                            <div>
                                Neighbourhood website:
                            </div>
                            <a href={park.neighbourhoodURL}>{park.neighbourhoodURL}</a>
                            <div>
                                Size (in hectares): {park.hectares}
                            </div>
                            <div>
                                Washrooms available?: {park.hasWashrooms ? "yes" : "no"}
                            </div>
                            <div>
                                Facilities available?: {park.hasFacilities ? "yes" : "no"}
                            </div>
                            <div>
                                Park advisories?: {park.hasAdvisories ? "yes" : "no"}
                            </div>
                            <div>
                                Special Features?: {park.hasSpecialFeatures ? "yes" : "no"}
                            </div>
                            <div>
                                Rating: {park.rating}
                            </div>
                            <div>
                                Number of Favorites: {park.favoritesCount || 0}
                            </div>
                        </div>
                    </div>
        )
    }
    facilitiesAndFeaturesTab = (park, facilities, features) => {

        return (
            <div className="ModalParkDetail-facilities-and-features">
                <div className="ModalParkDetail-FacilitiesTable TableContainer">
                    {
                        park.hasFacilities ?
                        <div className="FacilitiesTable Column">
                            <table>
                                <thead>
                                    <tr>
                                    <td>
                                        <b>Facility Type:</b>
                                    </td>
                                    <td>
                                        <b>Facility URL: </b>
                                    </td>
                                    <td>
                                        <b>Facility Count: </b>
                                    </td>
                                    </tr>
                                </thead>
                                <tbody>
                                {facilities.map((facility)=> {
                                    return <tr>
                                        <td>
                                            {facility.facilityType}
                                        </td>
                                        <td>
                                            {facility.facilityUrl}
                                        </td>
                                        <td>
                                            {facility.facilityCount}
                                        </td>
                                    </tr>
                                })
                                }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className="Column">There are no facilities at this park.</div>
                    }
                </div>
                <div className="ModalParkDetail-FeaturesTable TableContainer">
                    {
                        park.hasSpecialFeatures ?
                        <div className="FeaturesTable Column">
                            <table>
                                <thead>
                                    <tr>
                                        <td>
                                            <b>Feature Type: </b>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map((feature)=> {
                                    return <tr>
                                        <td>
                                            {feature.feature}
                                        </td>
                                    </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>

                    :
                    <div className="Column">There are no features at this park.</div>
                    }
                </div>
            </div>

        )
    }
    eventsTab = (park, parkId) => {
        return (
            <div className="ModalParkDetail-events">
                <div className="Section EventTable">
                    {
                    this.getEventsByPark().length > 0 ?

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
                                        <b>Add To Calendar</b>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                            {

                                this.getEventsByPark().map((event) => {

                                    let newEvent = {
                                        title: event.details,
                                        description: event.details,
                                        location: park.streetNumber + " " + park.streetName + " BC, Canada",
                                        startTime: this.getExportedTime(event.eventDateTime),
                                        endTime:  this.getExportedTime(event.eventEndDateTime)
                                    }
                                    return <tr key={event._id}>
                                        <td>
                                            {this.getCreatedTime(event.createdDateTime)}
                                        </td>
                                        <td>
                                            {event.creatorName}
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
                                            <button onClick={() => {
                                                this.props.deleteEventFromPark(event._id, park._id)
                                            }}>
                                                <b>X</b>
                                            </button>
                                        </td>
                                        <td>
                                        <button id="ShareCalendar"><ShareCalendar event={newEvent}/></button>
                                        </td>
                                    </tr>
                                })

                        }
                    </tbody>

                </table>
                :
                <div>
                    There are no events for this park
                </div>
            }

            <div className="AddEventForm">
            {
            this.props.updatingEvent
            ?
                <div className="ModalEventDetail-updatingEvent">
                    <LoadingSpinner />
                </div>
            :
                <EventForm
                event={null}
                eventDetails={event.details}
                eventId={null}
                showParkPicker={false}
                parkId={parkId}
                showCalendar={true}
                showDayPicker={true}
                />
            }
            </div>

        </div>
    </div>

        )
    }
    commentsTab = (parkId, comments, user) => {
        return (
            <div className="ModalParkDetail-comments">
                <div className="ParkComments">
                    <div className="ParkCommentHistory Column">
                    { comments.map((comment) => {
                        return <table>
                        <tbody>
                            <tr key={comment._id}>
                            <td>
                                <span>{comment.comment}</span> <br/>
                                <span id="commentDetails">Left by: {comment.creatorName} on {this.getCreatedTime(comment.createdDateTime)} </span>
                            </td>
                            <td>
                                <button onClick={() => {
                                    this.handleDeleteComment(comment, parkId)
                                }}>
                                <b>X</b>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        })
                    }
                    </div>
                    <div className="ParkCommentForm Column">
                         <CommentForm parkId={parkId} user={user} />
                     </div>


                </div>
            </div>
        )
    }
    ratingsTab = (averageRating) => {
        return(

            <div className="ModalParkDetail-ratings">
                <div className="Ratings">
                <button id={"rating-5"} onClick={() => this.handleAddRating(5)}>
                    <span  className="star">☆</span>
                </button>
                <button id={"rating-4"} onClick={() => this.handleAddRating(4)}>
                    <span  className="star">☆</span>
                </button>
                <button id={"rating-3"} onClick={() => this.handleAddRating(3)}>
                    <span  className="star">☆</span>
                </button>
                <button id={"rating-2"} onClick={() => this.handleAddRating(2)}>
                    <span className="star">☆</span>
                </button>
                <button id={"rating-1"} onClick={() => this.handleAddRating(1)}>
                    <span className="star">☆</span>
                </button>
                </div>
                <div className="AverageRating">
                    <span>Average Rating by Users: { averageRating }</span>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="LoadingState">
                    <LoadingSpinner key="loadingModal"/>
                </div>
            )
        }

        const park = this.props.selectedPark
        const averageRating = this.getAverageRating(park)
        const comments = this.getCommentsByPark(park)
        const user = this.props.user
        const parkId = this.props.parkId
        const facilities = park.facilities
        const features = park.specialFeatures



        let currentTab

        if (this.state.currentTab === 'ratings') {
            currentTab = this.ratingsTab(averageRating)
        } else if (this.state.currentTab === 'comments') {
            currentTab = this.commentsTab(parkId, comments, user)
        } else if (this.state.currentTab === 'events') {
            currentTab = this.eventsTab(park, parkId)
        } else if (this.state.currentTab === 'facilities-and-features') {
            currentTab = this.facilitiesAndFeaturesTab(park, facilities, features)
        } else {
            currentTab = this.descriptionTab(park)
        }

        return (
            <div className="detailed-content-main modal-card">
                <div className="ModalParkDetail-header">
                    <div className="ModalParkDetail-Title titleItem">
                    {park.name}
                    </div>
                    <div className="ModalParkDetail-divider"></div>
                    <div className="ModalParkDetail-toolbar">
                        <div className="ModalParkDetail-leftToolbar">
                            <div className={
                            `${this.state.currentTab === 'description' ? 'tab-selected' :''} ${'ModalParkDetail-tabSelector'}`}
                            onClick={() => this.selectTab('description')}>
                            <span className="ModalParkDetail-tabName">Description</span>
                            </div>
                            <div className={
                            `${this.state.currentTab === 'facilities-and-features' ? 'tab-selected' :''} ${'ModalParkDetail-tabSelector'}`}
                            onClick={() => this.selectTab('facilities-and-features')}>
                            <span className="ModalParkDetail-tabName">Facilities {`&`} Features</span>
                            </div>
                            <div className={
                            `${this.state.currentTab === 'events' ? 'tab-selected' :''} ${'ModalParkDetail-tabSelector'}`}
                            onClick={() => this.selectTab('events')}>
                            <span className="ModalParkDetail-tabName">Events</span>
                            </div>
                            <div className={
                            `${this.state.currentTab === 'comments' ? 'tab-selected' :''} ${'ModalParkDetail-tabSelector'}`}
                            onClick={() => this.selectTab('comments')}>
                            <span className="ModalParkDetail-tabName">Comments</span>
                            </div>
                            <div className={
                            `${this.state.currentTab === 'ratings' ? 'tab-selected' :''} ${'ModalParkDetail-tabSelector'}`}
                            onClick={() => this.selectTab('ratings')}>
                            <span className="ModalParkDetail-tabName">Ratings</span>
                            </div>
                        </div>

                        <div className="ModalParkDetail-rightToolbar">
                                {this.getSavedParkIcon()}
                        </div>

                    </div>
                </div>
                <div className="ModalParkDetail-divider"></div>
                <div className="ModalParkDetail-Body">
                    {currentTab}
                </div>

            </div>
        )
        return LoadingSpinner
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.parks.error,
        events: state.events.eventsByParkId,
        user: state.user.user,
        parks: state.parks.parks,
        comments: state.comments.commentsByParkId,
        selectedPark: state.parks.selectedPark,
        loading: state.parks.loadingParkDetails,
        updatingEvent: state.events.updatingEvent,
    }
};

const mapDispatchToProps = (dispatch) => ({
    deleteEventFromPark: (eventId, parkId) => dispatch(deleteEvent(eventId, parkId)),
    deleteCommentFromPark: (commentId, parkId) => dispatch(deleteParkComment(commentId, parkId)),
    toggleSavedPark: (user, parkId) => dispatch(toggleSavedPark(user, parkId)),
    addRating: (parkId, rating) => dispatch(addRating(parkId, rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalParkDetail);
