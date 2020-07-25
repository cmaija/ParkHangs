import React from 'react'
import {deleteEvent} from 'features/events/eventsSlice'
import {connect} from 'react-redux'
import 'features/modal/ModalParkDetail.css'
import moment from 'moment'
import CommentForm from 'components/CommentForm'
import { fetchParkComments, deleteParkComment } from 'features/comments/commentSlice'
import NoFilledHeartIcon from 'assets/icons/heart-no-fill.svg'
import FilledHeartIcon from 'assets/icons/heart-filled.svg'
import { toggleSavedPark } from "features/users/userSlice";
import AddToCalendar from 'react-add-to-calendar';
import { addRating } from 'features/parks/parksSlice'
import ShareCalendar from 'components/ShareCalendar'


class ModalParkDetail extends React.Component {

    constructor(props) {
        super(props);

        this.toggleFavouritePark = this.toggleFavouritePark.bind(this);
        this.getSavedParkIcon = this.getSavedParkIcon.bind(this);

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

    getCommentsByPark = () => {
        let res = this.props.comments[this.props.park._id]
        if (res === undefined) {
            //no comments for that park, return empty array
            return [];

        } else {
            return res; //filtered array
        }
    };

    getEventTime = (date) => {
        if (date != null) {
            return moment.unix(date).format("YYYY/MM/DD hh:MM a");
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
                return <img className="FilledHeartIcon" src={FilledHeartIcon}
                            onClick={this.toggleFavouritePark}/>
            } else {
                return <img className="NotFillHeartIcon" src={NoFilledHeartIcon}
                            onClick={this.toggleFavouritePark}/>
            }
        }
    }

    getExportedTime = (date) => {
        let formattedDate = moment.unix(date).format("YYYYMMDDTHHmmssZ");
        return formattedDate.replace("+00:00", "Z");
    }

    handleAddRating = (rating, parkId) => {
      let ratingToSend = {};
      // can add actual users here
      ratingToSend.user = rating;
      ratingToSend.parkId = parkId;
      this.props.addRating(ratingToSend);
    }

    render() {
        const park = this.props.parks.find(park => park._id === this.props.parkId)
        return (
            <div className="MarkerDetails">
                <div className="Title">
                    {park.name}
                </div>

                {this.getSavedParkIcon()}

                <div className="Details">

                  <div className="Section">
                    <div className="ParkComments">
                      <div>
                        <span className="SectionTitle">Park Comments</span>
                        { this.getCommentsByPark().map((comment) => {
                          return <table>
                            <tbody>
                              <tr key={comment._id}>
                                <td>{comment.comment}</td>
                                <td>
                                  <button onClick={() => {
                                      this.props.deleteCommentFromPark(comment._id, this.props.park._id)
                                    }}>
                                    <b>X</b>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          })
                        }
                        <CommentForm parkId={this.props.park._id} />
                      </div>
                    </div>
                  </div>
                    <div className="Section">
                        <span className="SectionTitle">Park Details</span>
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
                    <div className="Section EventTable">
                        <span className="SectionTitle">Events</span>
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
                                            <b>Add To GCalendar</b>
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
                                                   <button id ="ShareCalendar"><ShareCalendar event={newEvent}/></button>
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
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.parks.error,
        events: state.events.eventsByParkId,
        user: state.user.user,
        parks: state.parks.parks,
        comments: state.comments.commentsByParkId,
        user: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    deleteEventFromPark: (eventId, parkId) => dispatch(deleteEvent(eventId, parkId)),
    deleteCommentFromPark: (commentId, parkId) => dispatch(deleteParkComment(commentId, parkId)),
    toggleSavedPark: (user, parkId) => dispatch(toggleSavedPark(user, parkId)),
    addRating: (rating) => dispatch(addRating(rating))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalParkDetail);
