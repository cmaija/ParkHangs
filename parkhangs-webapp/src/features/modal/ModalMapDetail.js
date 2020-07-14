import React from 'react'
import { deleteEvent } from 'features/events/eventsSlice'
import {
    fetchEventsById,
    returnEventsByParkId} from 'features/parks/parksSlice.js'
import {connect} from 'react-redux'
import 'features/modal/ModalMapDetail.css'
import {unwrapResult} from '@reduxjs/toolkit'
import moment from 'moment'


class ModalMapDetail extends React.Component {

    getEventsByPark = () => {
        let res = this.props.events[this.props.park._id]
        if (res === undefined) {
            //no events for that park, return empty array
            return [];

        } else {
            return res; //filtered array
        }
    };

    getEventTime = (date) => {
        return moment.unix(date).format("hh:MM a");
    }

    getCreatedTime = (date) => {
        return moment.unix(date).format("YYYY/MM/DD hh:MM a");
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
                    <div className="Section">
                        <span className="SectionTitle">Events</span>
                        {


                            this.getEventsByPark().length > 0 ?

                                this.getEventsByPark().map((event) => {

                                    //key may need to be changed to event._id as backend
                                    return <div className="Event" key={event._id}>
                                        <div>
                                            <b>Created At:</b><br/>{this.getCreatedTime(event.createdDateTime)}
                                        </div>
                                        {/*unnecessary, users should not see this*/}
                                        {/*<div>*/}
                                        {/*    creatorID:<br/>{event.creatorId}*/}
                                        {/*</div>*/}
                                        <div>
                                            <b>Created by:</b><br/>{event.creatorName}
                                        </div>

                                        <div>
                                            <b>Details:</b><br/>{event.details}
                                        </div>
                                        <div>
                                            <b>Starts at:</b><br/>{this.getEventTime(event.eventDateTime)}
                                        </div>
                                        {/*unnecessary, users should not see this*/}
                                        {/*<div>*/}
                                        {/*    parkId:<br/>{event.parkId}*/}
                                        {/*</div>*/}
                                        <button onClick={() => {
                                            this.props.deleteEventFromPark(event._id, this.props.park._id)
                                        }}>
                                            <b>X</b>
                                        </button>
                                    </div>;
                                })
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
