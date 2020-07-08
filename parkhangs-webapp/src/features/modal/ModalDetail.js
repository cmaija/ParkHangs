import React from 'react'
import 'features/modal/ModalDetail.css'

class ModalDetail extends React.Component {
    render() {
        return (
            <div className="detailed-content-main modal-card">
                Events:
                {
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
        )
    }

}

export default ModalDetail
