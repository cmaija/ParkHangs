import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalOpen: false,
        modalProps: {},
    },

    reducers: {
        openModal: {
            reducer (state, action) {
                  state.modalOpen = true
                  state.modalProps = {...action.payload}
            },

            prepare (modalProps) {
                console.log('wtf')
                return {
                    payload: {
                        modalProps
                    }
                }
            }
        },

        closeModal: {
            reducer (state, action) {
                console.log('modal slice')
                state.modalOpen = false
            },
        },
    }
});

export const {
    openModal,
    closeModal,
    setModalProps } = modalSlice.actions

export default modalSlice.reducer
