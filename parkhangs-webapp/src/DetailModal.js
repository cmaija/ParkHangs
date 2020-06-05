import React from 'react'
import './DetailModal.css'

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
            modalOpen: false,
        }
    }

    closeModal () {
        this.setState{(modalOpen, false)}
    }

    openModal () {
        this.setState{(modalOpen, true)}
    }

    render() {
        if (this.props.show) {
            if (this.props.show) {
                return (
                    <div className="modal-background">
                        <div className="modal-container">
                            <div className="detailed-info modal-card">
                                <div className="detailed-content modal-card">
                                     <div className="detailed-content-top modal-card">
                                        <span className="detailed-content-title">{this.state.parkName}</span>
                                     </div>
                                     <div className="detailed-content-main modal-card">
                                        <span className="detailed-content-neighborhood modal-card">Neighborhood: {this.state.parkNeighborhood}</span>
                                        <span className="detailed-content-address modal-card">Address: {this.state.parkStreetNumber} {this.state.parkStreetName}</span>
                                     </div>
                                 </div>
                                 <button className="button" onClick={this.closeModal}>close</button>
                             </div>
                         </div>
                     </div>
                )
            }
            return null
        }
        return null
    }

}

export default DetailModal
