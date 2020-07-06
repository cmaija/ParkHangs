import {createSlice, createAsyncThunk, bindActionCreators} from '@reduxjs/toolkit'
import axios from 'axios';

//Thunk crated here
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
        parks: [
            {
                id: "1",
                parkName: "Dude Chilling Park",
                lat: 49.264012,
                lng: -123.095931,
                events: [
                    {id: 1, parkName: "Dude Chilling Park", eventTime: "2020-07-16T19:20-07:00"},
                    {id: 2, parkName: "Dude Chilling Park", eventTime: "2021-01-01T11:17-07:00"}
                ]
            },
            {
                id: "2",
                parkName: "Shaughnessy Park",
                lat: 49.2557,
                lng: -123.1351,
                events: [
                    {id: 1, parkName: "Shaughnessy Park", eventTime: "2020-08-01T13:30-07:00"}
                ]
            },
            {
                id: "4",
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
        selectedPark: "No park",
        eventsById: [],
        loading: 'idle',
        //currentRequestId: undefined,
        error : null //for errors in AJAX calls
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
    addEvent,
    deleteEvent,
    queryParks,
} = parksSlice.actions;
export default parksSlice.reducer


/* //API thunk call separated from slice DELETE LATER
export const fetchEventsById = (id) => async dispatch =>{
    try {
        dispatch(getEventsByIdStart())
        const EventsFetched = await axios
                                    .get(`http://localhost:9000/${id}/events`);
        dispatch(getEventsByIdSuccess(EventsFetched))
    }
    catch (err) {
        dispatch(getEventsByIdFailure(err.toString())) //might be err.message
    }
}
 */