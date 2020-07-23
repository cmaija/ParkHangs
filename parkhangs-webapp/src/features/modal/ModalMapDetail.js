import React from 'react'
import { deleteEvent } from 'features/events/eventsSlice'
import {
    fetchEventsById,
    returnEventsByParkId} from 'features/parks/parksSlice.js'
import {connect} from 'react-redux'
import 'features/modal/ModalMapDetail.css'
import {unwrapResult} from '@reduxjs/toolkit'
import moment from 'moment'
import AddToCalendar from 'react-add-to-calendar';



class ModalMapDetail extends React.Component {

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

    getExportedTime = (date) => {
        let formattedDate = moment.unix(date).format("YYYYMMDDTHHmmssZ");
        return formattedDate.replace("+00:00", "Z");
    }

    render() {
        return (
            <div className="MarkerDetails">
                <div className="Title">
                    {this.props.park.name}
                </div>
                <div className="Details">
                    <div className="Section">
                        <span className="SectionTitle">Park Details</span>
                        <div className="ParkLocationDetails">
                            <div>
                                Address: {this.props.park.streetNumber + " " + this.props.park.streetName}
                            </div>
                            <div>
                                Lat: {this.props.park.googleMapsLatLon[0]}
                            </div>
                            <div>
                                Lon: {this.props.park.googleMapsLatLon[1]}
                            </div>
                        </div>
                        <div className="OtherDetails">
                            <div>
                                Neighbourhood Name: {this.props.park.neighbourhoodName}
                            </div>
                            <div>
                                Neighbourhood website:
                            </div>
                            <a href={this.props.park.neighbourhoodURL}>{this.props.park.neighbourhoodURL}</a>
                            <div>
                                Size (in hectares): {this.props.park.hectares}
                            </div>
                            <div>
                                Washrooms available?: {this.props.park.hasWashrooms ? "yes" : "no"}
                            </div>
                            <div>
                                Facilities available?: {this.props.park.hasFacilities ? "yes" : "no"}
                            </div>
                            <div>
                                Park advisories?: {this.props.park.hasAdvisories ? "yes" : "no"}
                            </div>
                            <div>
                                Special Features?: {this.props.park.hasSpecialFeatures ? "yes" : "no"}
                            </div>
                            <div>
                                Rating: {this.props.park.rating}
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
                                                location: this.props.park.name + " BC, Canada",
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
                                                        this.props.deleteEventFromPark(event._id, this.props.park._id)
                                                    }}>
                                                        <b>X</b>
                                                    </button>
                                                </td>
                                                <td>
                                                   <AddToCalendar event={newEvent}/>
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
        events: state.events.eventsByParkId 
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteEventFromPark: (eventId, parkId) => dispatch(deleteEvent(eventId, parkId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalMapDetail);
