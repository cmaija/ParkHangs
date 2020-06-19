import {createSlice} from '@reduxjs/toolkit'

// export const selectPark = createAction('SelectPark')

const parksSlice = createSlice({
    name: 'parks',
    initialState: {
        parks: [
            {
                id: "0",
                parkName: "Dude Chilling Park",
                lat: 49.264012,
                lng: -123.095931,
                events: [
                    {parkName: "Dude Chilling Park", eventTime: "2020-07-16T19:20-07:00"},
                    {parkName: "Dude Chilling Park", eventTime: "2021-01-01T11:17-07:00"}
                ]
            },
            {
                id: "1",
                parkName: "Shaughnessy Park",
                lat: 49.2557,
                lng: -123.1351,
                events: [
                    {parkName: "Shaughnessy Park", eventTime: "2020-08-01T13:30-07:00"}
                ]
            },
            {
                id: "2",
                parkName: "Sunset Beach Park",
                lat: 49.2800,
                lng: -123.1387,
                events: [
                    {parkName: "Sunset Beach Park", eventTime: "2020-06-29T10:45-07:00"},
                    {parkName: "Sunset Beach Park", eventTime: "2020-07-16T19:20-07:00"},
                    {parkName: "Sunset Beach Park", eventTime: "2020-12-24T07:50-07:00"}
                ]
            }
        ]
        // selectedParkID: 0
    },

    reducers: {
        selectPark: {
            reducer(state, action) {
              // let newState = {parks: [...state.parks],
							// selectedItem: action.id};
		          // return newState;
              const {id, name} = action.payload
              state.push({id, name})
            },
        }
    }
});

export const { selectPark } = parksSlice.actions

export default parksSlice.reducer
