import React from 'react'
// import AddEventForm from '../components/AddEventForm'
import { deleteEvent, fetchEventsById, returnEventsByParkId } from 'features/parks/parksSlice.js'
import { connect } from 'react-redux'
import 'features/modal/ModalMapDetail.css'
import {unwrapResult} from '@reduxjs/toolkit'


class ModalMapDetail extends React.Component {

    // this.props.park is the current park. Passed in as a prop. Not from store

    //local state
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }


    componentDidMount = async () => {
        /* let result =  await this.getEvents(); //NOT USED ANYMORE; REPLACED STORE WITH LOCAL STATE VALUE
        console.log(this.props.error);
        if(this.props.error){
            throw this.props.error
        } */

        this.setState({events: this.props.returnEvents(this.props.park.parkId).slice()})
    }

    getEvents = async () => {
        try{
            const resultAction = await this.props.fetchEvents(this.props.park.parkId);
            const events = unwrapResult(resultAction); //resolving the promise and actually getting back the payload
             return events;

        }catch (err) {
            console.error(err);
            return err;
        }
    };


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
                                Neighbourhood website URL: {this.props.park.neighbourhoodURL}
                            </div>
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
                            //TODO: need gordon's filter and select park endpoint to work properly

                             // this.props.eventsById.map ((event) =>   {

                             this.state.events.map ((event) =>   {

                                    //key may need to be changed to event._id as backend
                                    return <div className="Event" key={event._id}>
                                        {/* <div>
                                            _id: {event._id}
                                        </div>  */}
                                        <div>
                                            createdDateTime:<br/>{event.createdDateTime}
                                        </div>

                                        <div>
                                            creatorID:<br/>{event.creatorId}
                                        </div>

                                        <div>
                                            creator:<br/>{event.creatorName}
                                        </div>

                                        <div>
                                            details:<br/>{event.details}
                                        </div>

                                        <div>
                                            DateTime:<br/>{event.eventDateTime}
                                        </div>

                                        <div>
                                            parkId:<br/>{event.parkId}
                                        </div>

                                        <button onClick={() => {
                                            this.props.deleteEventFromPark(this.props.park._id, event.id)
                                        }}>
                                            X
                                        </button>
                                    </div>;
                                })

                            }
                        {/*<AddEventForm park={this.props.park}/>*/}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //eventsById: state.parks.eventsById, //universal; actions for fulfillment and rejected not connecting? array remains empty
        error: state.parks.error,
        events:state.events
    }
};

const mapDispatchToProps = (dispatch) => ({
    deleteEventFromPark: (parkId, eventId) => dispatch(deleteEvent(parkId, eventId)),
    //fetchEvents: (parkId) => dispatch(fetchEventsById(parkId)) //should then cases be added here?
    returnEvents: (parkId) => dispatch(returnEventsByParkId(parkId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMapDetail);
