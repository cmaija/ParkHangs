import React from 'react'
import AddEventForm from './AddEventForm'
import './DetailModal.css'

class DetailModal extends React.Component {
    render() {
        return (
            <div>
                <div>
                    Name: {this.props.park.parkName}
                </div>
                <div>
                    Lat: {this.props.park.lat}
                </div>
                <div>
                    Lon: {this.props.park.lng}
                </div>
                Events:
                {
                    this.props.park.events.map((event) => {
                        return <div key={event.id}>
                            <div>
                                {event.parkName}
                            </div>
                            <div>
                                {event.eventTime}
                            </div>
                            <button onClick={() => {
                                this.props.deleteEventFromPark(this.props.park.id, event.id)
                            }}>
                                X
                            </button>
                        </div>;
                    })
                }

                <AddEventForm park={this.props.park}/>
                <button onClick={() => {
                    this.setState({showDetails: false})
                }}>Close
                </button>
            </div>
        )
    }

}

export default DetailModal
