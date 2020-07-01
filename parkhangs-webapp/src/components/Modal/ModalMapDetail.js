import React from 'react'
import AddEventForm from 'components/AddEventForm'
import { deleteEvent } from 'features/parks/parksSlice.js'
import { connect } from 'react-redux'
import 'components/Modal/ModalMapDetail.css'

class ModalMapDetail extends React.Component {
    selectedPark = () => {
        return this.props.parks.find(park => park.parkName === this.props.park)
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
                            this.selectedPark().events.map((event) => {
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalMapDetail);
