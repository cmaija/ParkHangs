import React from 'react'
import ModalDetail from 'features/modal/ModalDetail'
import ModalEventDetail from 'features/modal/ModalEventDetail'
import ModalUserEdit from "./ModalUserEdit"
import ModalParkDetail from "./ModalParkDetail"
import ModalNewEvent from 'features/modal/ModalNewEvent'
import './Modal.css'
import { connect } from 'react-redux'

import {
    openModal,
    closeModal } from 'features/modal/modalSlice';

class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: true
        }
    }

    components = {
        'ModalDetail': ModalDetail,
        'ModalParkDetail': ModalParkDetail,
        'ModalUserEdit' : ModalUserEdit,
        'ModalEventDetail': ModalEventDetail,
        'ModalNewEvent': ModalNewEvent,
    }

    close = () => {
        this.props.closeModal()
    }

    render() {
        if (this.state.showModal) {
            const ComponentName = this.props.modalProps.component
                ? this.components[this.props.modalProps.component]
                : false
            const hasComponent = !!this.props.modalProps.component
            return (
                <div className="modal-background">
                    <div className="modal-container">
                        <div className="detailed-info modal-card">
                            <div className="detailed-content modal-card">
                                {hasComponent && <ComponentName {...this.props.modalProps.componentParams}/>}
                            </div>
                        </div>
                        <button className="button" onClick={this.close}>Close</button>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal(false)),
})

export default connect(null, mapDispatchToProps)(Modal)
