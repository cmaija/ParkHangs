import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        open: false,
    },

    reducers: {
        openModal: {
            reducer (state, action) {
                  const open = action.payload
                  state.open = open
            },
        }
    }
});

export const { openModal } = modalSlice.actions

export default modalSlice.reducer
