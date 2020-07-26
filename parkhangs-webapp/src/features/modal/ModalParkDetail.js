import React from 'react'
import {deleteEvent} from 'features/events/eventsSlice'
import {connect} from 'react-redux'
import 'features/modal/ModalParkDetail.css'
import moment from 'moment'
import NoFilledHeartIcon from 'assets/icons/heart-no-fill.svg'
import FilledHeartIcon from 'assets/icons/heart-filled.svg'
import { toggleSavedPark } from "features/users/userSlice";
import ShareCalendar from 'components/ShareCalendar'


class ModalParkDetail extends React.Component {
    getEventsByPark = () => {
        let res= this.props.events[this.props.park._id]
        if (res === undefined) {
            //no events for that park, return empty array
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

    render() {
        const park = this.props.parks.find(park => park._id === this.props.parkId)
        return (
            <div className="MarkerDetails">
                <div className="Title">
                    {park.name}
                </div>

                {this.getSavedParkIcon()}

                <div className="Details">
                    <div className="Section Left">
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
                    <div className="Section Right">
                        <span className="SectionTitle">Events</span>
                        <div className="EventTable">
                             {
                            this.getEventsByPark().length > 0 ?

                                <table className = "Table">
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
                                                <td className="ExportButton">
                                                  <ShareCalendar event={newEvent}/>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.parks.error,
        events: state.events.eventsByParkId,
        user: state.user.user,
        parks: state.parks.parks
    }
};

const mapDispatchToProps = (dispatch) => ({
    deleteEventFromPark: (eventId, parkId) => dispatch(deleteEvent(eventId, parkId)),
    toggleSavedPark: (user, parkId) => {
        dispatch(toggleSavedPark(user, parkId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalParkDetail);
