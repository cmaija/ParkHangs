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
    //currently promise is being rejected: figure out how to call the promise here and load into events.map area
       console.log(this.props.fetchEvents(this.selectedPark().id))
      
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
                            //need to change the line below
                            this.selectedPark().events.map((event) => {
                            //uncomment to test endpoint; BROKEN: map not a function bc res is an json not array?
                            //TODO: need gordon's filter and select park endpoint to work properly
                            
                                //TODO: fix this is broken!!
                               
                                    //key may need to be changed to event._id as backend
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
    fetchEvents: (parkId) => dispatch(fetchEventsById(parkId)) //should then cases be added here?
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalMapDetail);
