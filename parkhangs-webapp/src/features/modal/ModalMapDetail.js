import React from 'react'
import AddEventForm from 'components/AddEventForm'
import { deleteEvent,fetchEventsById } from 'features/parks/parksSlice.js'
import { connect } from 'react-redux'
import 'features/modal/ModalMapDetail.css'

class ModalMapDetail extends React.Component {
    selectedPark = () => {
        return this.props.parks.find(park => park.parkName === this.props.park)
    }
    componentDidMount(){
        console.log(this.props.fetchEventsById(this.selectedPark().id));
    }
    
    render() {
        return (
            <div className="MarkerDetails">
                <div className="Title">
                    {this.props.parkName}
                </div>
                <div className="Details">
                    <div className="Section">
                        <span className="SectionTitle">Park Details</span>
                        <div className="ParkLocationDetails">
                            <div>
                                Lat: {this.selectedPark().lat}
                            </div>
                            <div>
                                Lon: {this.selectedPark().lng}
                            </div>
                        </div>
                        <div className="OtherDetails">
                            Other park details (washrooms, fields, etc.) go here
                        </div>
                    </div>
                    <div className="Section">
                        <span className="SectionTitle">Events</span>
                        {
                            //Call dispatch to action for getEventsByID endpoint?
                            //need to change the line below
                            this.selectedPark().events.map((event) => {
                              //this.props.fetchEventsById(this.selectedPark().id).map((event) => { //uncomment to test endpoint; map not a function bc res is an json not array?
                                return <div className="Event" key={event.id}>
                                    <div>
                                        {event.parkName} -
                                    </div>
                                    <div>
                                        {event.eventTime}
                                    </div>
                                    <button onClick={() => {
                                        this.props.deleteEventFromPark(this.selectedPark().id, event.id)
                                    }}>
                                        X
                                    </button>
                                </div>;
                            })
                        }
                        <AddEventForm park={this.selectedPark()}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        parks: state.parks.parks

    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteEventFromPark: (parkId, eventId) => dispatch(deleteEvent(parkId, eventId)),
    fetchEventsById: (parkId) => dispatch(fetchEventsById(parkId)) //api call
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalMapDetail);
