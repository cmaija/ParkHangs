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
        selectedPark: "No park"
    },

    reducers: {
        addPark: {
            reducer(state, action) {
                const {id, name} = action.payload
                state.push({id, name})
            },
        },

        selectPark: {
          reducer(state, action) {
              const {parkID} = action.payload
              state.selectedPark = parkID
              console.log(state.selectedPark)
            },
            prepare(parkID) {
              return {
                payload: {
                  parkID
                }
              }
            }
        },

        deleteEvent(state, action) {
            const eventID = action.payload
            function findID (state){

                for (let i = 0; i < state.parks.parks.length; i++) {
                    for (let j = 0; j < state.parks.parks[i].events.length; j++) {
                        if (eventID !== state.parks.parks[i].events[j].id){
                            state.parks.parks[i].events.splice(j--,1);
                            //should delete the intended message; j-- decrements index so when array shifts no element is skipped
                        }
                    }

                }
            }



        }
    }
})

export const {addPark, selectPark} = parksSlice.actions

export default parksSlice.reducer
