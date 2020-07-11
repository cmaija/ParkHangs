import React from 'react'
import AddEventForm from 'components/AddEventForm'
import 'features/modal/ModalDetail.css'
import moment from 'moment'
import { connect } from "react-redux"
import apis from 'api/index'

class ModalDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            eventsOnCurrentDate: this.props.events
        }
    }

    date = () => {
        const momentDate = moment(this.props.date)
        return momentDate.format("MMMM Do YYYY")
    }

    deleteEvent = async (eventId) => {
        try {
            console.log(typeof eventId)
            console.log(typeof this.props.park._id)
            await this.props.deleteOneEvent(eventId, this.props.park._id)
            const eventIndex = this.state.eventsOnCurrentDate.findIndex(event => event._id === eventId)
            console.log(eventIndex)
            const newEventsArray = this.state.eventsOnCurrentDate.splice(eventIndex, 1)
            this.setState({ eventsOnCurrentDate: newEventsArray })
        } catch (error) {
            console.error(error)
        }

    }

    render() {
        const date = this.date()
        return (
            <div className="detailed-content-main modal-card">
                <span className="ModalDetail-Title">{`${this.props.park.name}: ${date}`}</span>
                <div className="ModalDetail-Body">
                    <div className="EventsList">
                        <span className="EventsList-Title">Events:</span>
                        <div className="EventsList-populated">
                        {   this.props.events.length > 0 &&
                                this.props.events.map((event) => {
                                    return <div className="event"key={event._id}>
                                        <div className="event-info">
                                            <div className="event-details">
                                                {event.details}
                                            </div>
                                            <div className="event-datetime">
                                                {event.eventDateTime}
                                            </div>
                                        </div>
                                        <div className="event-buttons">
                                            <button>Edit</button>
                                            <button onClick={() => this.deleteEvent(event._id)}>delete</button>
                                        </div>
                                    </div>
                                })

                        }
                        </div>
                        {
                            this.props.events.length === 0 &&
                            <span className="EventsList-empty">There are no events on this date</span>
                        }
                    </div>
                    <div className="AddEventForm">
                        <AddEventForm parkId={this.props.park._id} currentDate={this.props.date} />
                    </div>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => ({
    deleteOneEvent: (eventId, parkId) => dispatch(apis.deleteEvent(eventId, parkId))
})

export default connect(null, mapDispatchToProps)(ModalDetail);
