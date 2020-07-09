import React from 'react'
import AddEventForm from 'components/AddEventForm'
import 'features/modal/ModalDetail.css'
import moment from 'moment'
import { connect } from "react-redux"

class ModalDetail extends React.Component {
    date = () => {
        const momentDate = moment(this.props.date)
        return momentDate.format("MMMM Do YYYY")
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
                                    return <div key={event._id}>
                                        <div>
                                            {event.details}
                                        </div>
                                        <div>
                                            {event.eventDateTime}
                                        </div>
                                    </div>;
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

const mapStateToProps = (state) => {
    return {
        events: state.parks.events
    }
}

export default connect(mapStateToProps, null)(ModalDetail);
