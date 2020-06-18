
import { createSlice } from '@reduxjs/toolkit'

const parksSlice = createSlice({
    name: 'parks',

    initialState: [
        ["Dude Chilling Park", "2020-07-16T19:20-07:00"],
        ["Shaughnessy Park", "2020-08-01T13:30-07:00"],
        ["Sunset Beach Park", "2020-06-29T10:45-07:00"]

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
