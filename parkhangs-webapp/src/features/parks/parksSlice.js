import {createSlice} from '@reduxjs/toolkit'

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
                    {id: 1, parkName: "Dude Chilling Park", eventTime: "2020-07-16T19:20-07:00"},
                    {id: 2, parkName: "Dude Chilling Park", eventTime: "2021-01-01T11:17-07:00"}
                ]
            },
            {
                id: "1",
                parkName: "Shaughnessy Park",
                lat: 49.2557,
                lng: -123.1351,
                events: [
                    {id: 1, parkName: "Shaughnessy Park", eventTime: "2020-08-01T13:30-07:00"}
                ]
            },
            {
                id: "2",
                parkName: "Sunset Beach Park",
                lat: 49.2800,
                lng: -123.1387,
                events: [
                    {id: 1, parkName: "Sunset Beach Park", eventTime: "2020-06-29T10:45-07:00"},
                    {id: 2, parkName: "Sunset Beach Park", eventTime: "2020-07-16T19:20-07:00"},
                    {id: 3, parkName: "Sunset Beach Park", eventTime: "2020-12-24T07:50-07:00"}
                ]
            }
        ],
        filteredParks: [],
        selectedPark: "No park"
    },

    reducers: {
        addPark: {
            reducer(state, action) {
                // let newState = {parks: [...state.parks],
                // selectedItem: action.id};
                // return newState;
                return state
            },
        },

        queryParks: {
            reducer (state, action) {
                const { query } = action.payload
                state.filteredParks = state.parks.filter((park) => {
                    return park.parkName === query
                })
            },

            prepare (query) {
                return {
                    payload: {
                        query,
                    }
                }
            }
        },

        selectPark: {
          reducer(state, action) {
              const {parkID} = action.payload
              state.selectedPark = parkID
            },
            prepare(parkID) {
              return {
                payload: {
                  parkID
                }
              }
            }
        },

        deleteEvent: {
            reducer(state, action) {
                const {parkId, eventId} = action.payload;

                for (let i = 0; i < state.parks.length; i++) {

                    if (state.parks[i].id === parkId) {
                        // have the park

                        for (let j = 0; j < state.parks[i].events.length; j++) {

                            if (eventId === state.parks[i].events[j].id) {
                                state.parks[i].events.splice(j)
                            }
                        }
                    }
                }
            },
            prepare(parkId, eventId) {
                return {
                    payload: {
                        parkId,
                        eventId
                    }
                }
            }
        },
        addEvent: {
            reducer(state, action) {
                const {parkId, event} = action.payload

                for (let i = 0; i < state.parks.length; i++) {
                    if (state.parks[i].id === parkId) {
                        state.parks[i].events.push(event)
                    }
                }
            },

            prepare(parkId, event) {
                return {
                    payload: {
                        parkId,
                        event
                    }
                }
            }
        }
    }
});

export const {
    selectPark,
    addEvent,
    deleteEvent,
    queryParks } = parksSlice.actions;
export default parksSlice.reducer
