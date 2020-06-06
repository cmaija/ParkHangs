import React from 'react'
import '../DetailModal.css'

class DetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            details: {
                parkName: 'Douglas Park',
                parkNeighborhood: 'Cambie',
                neighborhoodUrl: 'https://vancouver.ca/news-calendar/south-cambie.aspx',
                parkStreetNumber: '801',
                parkStreetName: 'W 22nd Ave',
            },
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
                                    <span className="detailed-content-neighborhood modal-card">Neighborhood: {this.state.details.parkNeighborhood}</span>
                                    <span className="detailed-content-address modal-card">Address: {this.state.details.parkStreetNumber} {this.state.details.parkStreetName}</span>
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

export default DetailModal