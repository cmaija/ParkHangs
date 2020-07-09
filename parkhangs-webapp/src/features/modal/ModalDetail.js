import React from 'react'
import AddEventForm from 'components/AddEventForm'
import 'features/modal/ModalDetail.css'
import moment from 'moment'

class ModalDetail extends React.Component {
    date = () => {
        const momentDate = moment(this.props.date)
        console.log(momentDate)
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
                                    return <div key={event.eventTime}>
                                        <div>
                                            {event.parkName}
                                        </div>
                                        <div>
                                            {event.eventTime}
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
                        <AddEventForm currentDate={this.props.date} />
                    </div>
                </div>
            </div>
        )
    }

}

export default ModalDetail
