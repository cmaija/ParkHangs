import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';


//Thunk created here; api call for eventsbyparkId stored to store
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
        },
        returnEventsByParkId: {
            //uses store's Events object that Phil will implement and 
            //returns subset of events to modal
            reducer(state, action) {
               const {parkId} = action.payload
               return events[parkId]; //TODO: Phil can check if this works
            },
            prepare(parkId){
                return{
                    payload: {
                        parkId
                    }
                }
            }
        }
    },

    extraReducers: {

        [fetchEventsById.fulfilled]:(state, action) =>{
            //action should return endpoint's call's events
    
            const { requestId } = action.meta      
            //In the case of no Events; no errors thrown but want to empty array
            state.eventsById = [];

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

export const {selectPark, addEvent, deleteEvent, queryParks, fetchParksSuccessful, returnEventsByParkId} = parksSlice.actions;
export default parksSlice.reducer
