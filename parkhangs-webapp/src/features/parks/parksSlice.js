
import { createSlice } from '@reduxjs/toolkit'

const parksSlice = createSlice({
    name: 'parks',

    initialState: [],

    reducers: {
        addPark: {
            reducer(state, action) {
                const { id, name } = action.payload
                state.push({ id, name })
            },
        },
    }
})

export const { addPark } = parksSlice.actions

export default parksSlice.reducer
