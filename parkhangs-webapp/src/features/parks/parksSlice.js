import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';


//Thunk created here
export const fetchEventsById = createAsyncThunk(
    'parks/fetchEventsByIdStatus',  async (id, {rejectWithValue}) => {

        try {
             const response = await axios.get(`http://localhost:9000/${id}/events`)
             return response.data.data;
        } catch (err){
            if (!err.response) {
               return err;
            }

           return rejectWithValue(err.response.data)
        }


    }
);

const parksSlice = createSlice({
    name: 'parks',

    initialState: {
        parks: [],
        filteredParks: [],
        eventsById: [],
        loading: 'idle',
        //currentRequestId: undefined,
        error : null //for errors in AJAX calls
    },

    reducers: {

        fetchParksSuccessful: {
            reducer(state, action) {
                const {parksArray} = action.payload;
                state.parks = parksArray;
            },

            prepare(parksArray) {
                return {
                    payload: {
                        parksArray
                    }
                }
            }
        },

        queryParks: {
            reducer(state, action) {
                const {query} = action.payload
                state.filteredParks = state.parks.filter((park) => {
                    return park.parkName === query
                })
            },

            prepare(query) {
                return {
                    payload: {
                        query,
                    }
                }
            }
        },

        fetchEventsSuccessful: {
            reducer(state, action) {
                const {eventsArray} = action.payload;
                state.events = eventsArray;
            },

            prepare(eventsArray) {
                return {
                    payload: {
                        eventsArray
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
    },

    extraReducers: {
        /*
            [fetchEventsById.pending]: (state, action) => {
                if (state.loading === 'idle') {
                  state.loading = 'pending'
                  state.currentRequestId = action.meta.requestId
                }
            },

            prepare(events) {
               return {
                   payload: {
                       events //debug
                   }
               }
           }, */


        [fetchEventsById.fulfilled]:(state, action) =>{
            //action should return endpoint's call's events
            //TODO: Currently undefined payload? Action not called?
            //Or have this action return the events locally to component later?

            //const {events} = action.payload
            const { requestId } = action.meta

            console.log("in getEventsByIdSuccess,", action.payload);
            //console.log("events:" ,events); //broken


            for(let i = 0 ; i< action.payload.length; i ++){

                state.eventsById.push(action.payload[i]);
            }
        },
        [fetchEventsById.rejected]: (state, action) => {
            //action should return endpoint's error
            if(action.payload){
                // If a rejected action has a payload, it means that it was returned with rejectWithValue
                state.eventsById = [] //reset/clear with error
                state.error = action.payload.errorMessage
            }
            else {
                state.eventsById = [] //reset/clear with error
                state.error = action.error
            }
        }

    }
});

export const {
    selectPark,
    fetchEventsSuccessful,
    addEvent,
    deleteEvent,
    queryParks } = parksSlice.actions;
export default parksSlice.reducer
