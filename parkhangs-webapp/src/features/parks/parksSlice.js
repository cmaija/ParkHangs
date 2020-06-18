
import { createSlice } from '@reduxjs/toolkit'

const parksSlice = createSlice({
    name: 'parks',

    initialState: [
        {parkName: "Dude Chilling Park", eventTime: "2020-07-16T19:20-07:00"},
        {parkName: "Shaughnessy Park", eventTime: "2020-08-01T13:30-07:00"},
        {parkName: "Sunset Beach Park", eventTime: "2020-06-29T10:45-07:00"}

    ],

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
