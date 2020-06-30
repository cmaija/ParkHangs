import React from 'react'
import './ModalDetail.css'
import { connect } from 'react-redux'


class EventDetailModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            details : {
                parkName: this.props.parks[1].events[0].parkName ,
                eventTime: this.props.parks[1].events[0].eventTime
            }

        }
    }

    render() {
        return (
            <div>
                 <div className="detailed-content-top modal-card">
                    <span className="detailed-content-title">{this.state.details.parkName}</span>
                 </div>
                 <div className="detailed-content-main modal-card">
                    <span className="detailed-content-parkname modal-card">Parkname: {this.state.details.parkName}</span>
                    <span className="detailed-content-starttime modal-card">StartTime: {this.state.details.eventTime} {this.state.details.parkStreetName}</span>
                 </div>
             </div>
        )
    }
}

const mapStateToProps = state =>{
    return{parks: state.parks.parks}
}


export default connect(mapStateToProps, null)(EventDetailModal);
