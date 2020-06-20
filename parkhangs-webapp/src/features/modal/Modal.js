import React from 'react'
import './Modal.css'
import DetailModal from '../../components/DetailModal';
import EventDetailModal from '../../components/EventDetailModal';

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: true,
        }
    }

    components: {
        detailModal: DetailModal,
        eventModal: EventModal,
    }

    render() {
        if (this.state.showModal) {
            const ComponentName = this.props.component ? this.components[this.props.component] : false
            const hasComponent = !!this.props.component
            return (
                <div className="modal-background">
                    <div className="modal-container">
                        <div className="detailed-info modal-card">
                            <div className="detailed-content modal-card">
                                {hasComponent && <ComponentName {...this.props.componentParams}/>}
                            </div>
                        </div>
                        <button className="button" onClick={this.props.close}>close</button>
                    </div>
                </div>
            )
        }
    }
}

export default Modal
