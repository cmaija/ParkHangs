import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/',
});

export const fetchParks = createAsyncThunk(
    '/parks', async ({rejectWithValue}) => {

        try {
            const response = await api.get('/parks');
            return response.data.data;
        } catch (err){
            if (!err.response) {
                return err;
            }

            return rejectWithValue(err.response.data)
        }

        // await api.get('/parks')
        //     .then((res) => {
        //         if (!res.data.success) {
        //             console.log("not successful in fetching parks");
        //             console.log(res.data.success);
        //         } else {
        //             console.log(res.data.data);
        //             return res.data.data;
        //         }
        //     })
        //     .catch((error) => {
        //         //TODO: error handle
        //         console.log(error);
        //         return error.data.message;
        //     })
    });


// await api.get('/parks')
//     .then((res) => {
//         if (!res.data.success) {
//             console.log("not successful in fetching parks");
//             console.log(res.data.success);
//         } else {
//             console.log(res.data.data);
//             return res.data.data;
//         }
//     })
//     .catch((error) => {
//         //TODO: error handle
//         console.log(error);
//     })

const parksSlice = createSlice({
    name: 'parks',

    initialState: {
        parks: [],
        filteredParks: [],
        selectedPark: "No park"
    },

    reducers: {

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

        [fetchParks.fulfilled]: (state, action) => {
            //TODO: action.payload is undefined here!???!?!?!?!!!?!?

            const {requestId} = action.meta;


            //state.parks.push(action.payload);
        },

        [fetchParks.rejected]: (state, action) => { //TODO:
            //action should return endpoint's error
            if (action.payload) {
                // If a rejected action has a payload, it means that it was returned with rejectWithValue
                console.log(action.payload.errorMessage);
            } else {
                console.log(action.error);
            }
        }
    }
});

export const {addParks, selectPark, addEvent, deleteEvent} = parksSlice.actions;

export default parksSlice.reducer;
