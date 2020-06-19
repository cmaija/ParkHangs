import React from 'react'
import './DetailModal.css'
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
        console.log(this.props.showModal)
        if (this.props.showModal) {
            return (
                <div className="modal-background">
                    <div className="modal-container">
                        <div className="detailed-info modal-card">
                            <div className="detailed-content modal-card">
                                 <div className="detailed-content-top modal-card">
                                    <span className="detailed-content-title">{this.state.details.parkName}</span>
                                 </div>
                                 <div className="detailed-content-main modal-card">
                                    <span className="detailed-content-parkname modal-card">Parkname: {this.state.details.parkName}</span>
                                    <span className="detailed-content-starttime modal-card">StartTime: {this.state.details.eventTime} {this.state.details.parkStreetName}</span>
                                 </div>
                             </div>
                             <button className="button" onClick={this.props.close}>close</button>
                         </div>
                     </div>
                 </div>
            )
        }
        return null
    }
}

const mapStateToProps = state =>{
    return{parks: state.parks.parks}
}


export default connect(mapStateToProps, null)(EventDetailModal);