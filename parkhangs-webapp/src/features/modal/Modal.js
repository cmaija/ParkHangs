import React from 'react'
import 'features/modal/Modal.css'
import ModalDetail from 'features/modal/ModalDetail'
import ModalMapDetail from 'features/modal/ModalMapDetail'
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
        'ModalMapDetail': ModalMapDetail,
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
                        <button className="button" onClick={this.close}>close</button>
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
