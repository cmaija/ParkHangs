import {
    createSlice,
    createAsyncThunk } from '@reduxjs/toolkit'
import ParkService from 'services/parks.service'


export const fetchEventsById = createAsyncThunk(
    'parks/fetchEventsByIdStatus',  async (id, {rejectWithValue}) => {
        try {
             const response = await ParkService.getEventsByParkId(id)
             return response.data.data;
        } catch (err){
            if (!err.response) {
               return err;
            }

           return rejectWithValue(err.response.data)
        }
    }
)

const parksSlice = createSlice({
    name: 'parks',
    initialState: {
        parks: [],
        filteredParks: [],
        loadingParks: true,
        addingRating: false,
        error : null
    },

    reducers: {
        fetchParksStart (state) {
            state.loadingParks = true
            state.error = null
        },

        fetchParksSuccessful (state, action) {
            const parks = action.payload
            state.parks = parks
            state.loadingParks = false
            state.error = null
        },

        fetchParksFailure (state, action) {
            state.loadingParks = false
            state.error = action.payload
        },

        filterParks (state, action) {
            const query = action.payload
            state.filteredParks = state.parks.filter((park) => {
                return park.name.toLowerCase().includes(query.toLowerCase())
            })
        },

        updateParkByIdStart (state, action) {
            state.loadingParks = true
            state.error = null
        },

        updateParkByIdSuccessful (state, action) {
            const newPark = action.payload
            let newParksList = state.parks.filter(park => park._id !== newPark._id)

            newParksList.push(newPark)
            state.parks = newParksList
            state.loadingParks = false
            state.error = null
        },

        updateParkByIdFailure (state, action) {
            state.loadingParks = false
            state.error = action.payload
        },

        addRatingStart (state, action) {
            state.addingRating = true
            state.error = null
        },

        addRatingSuccessful (state, action) {
            const updatedPark = action.payload
            const updatedRatings = updatedPark.ratings
            let newParksList = state.parks.filter(park => park._id !== updatedPark._id)
            newParksList.push(updatedPark)
            state.parks = newParksList

            state.addingRating = false
            state.error = null
        },

        addRatingFailure (state, action) {
            state.addingRating = false
            state.error = action.payload
        }
    },

    extraReducers: {
        [fetchEventsById.fulfilled]: (state, action) => {
            //action should return endpoint's call's events
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
    },
})

export const {
    fetchParksStart,
    fetchParksSuccessful,
    fetchParksFailure,
    filterParks,
    updateParkByIdStart,
    updateParkByIdSuccessful,
    updateParkByIdFailure,
    addRatingStart,
    addRatingSuccessful,
    addRatingFailure
} = parksSlice.actions

export default parksSlice.reducer

export const updateParkById = (parkId) => async dispatch => {
    try {
        dispatch(updateParkByIdStart())
        const park = await ParkService.getParkById(parkId)
        dispatch(updateParkByIdSuccessful(park))
    } catch (error) {
        dispatch(updateParkByIdFailure(error.toString()))
    }
}

export const fetchParks = () => async dispatch => {
    try {
        dispatch(fetchParksStart())
        const parks = await ParkService.getParks()
        dispatch(fetchParksSuccessful(parks))
    } catch (error) {
        dispatch(fetchParksFailure(error.toString()))
    }
}

export const addRating = (parkId, rating) => async dispatch => {
    try {
        dispatch(addRatingStart())
        const updatedPark = await ParkService.addRating(parkId, rating)
        dispatch(addRatingSuccessful(updatedPark))
    } catch (error) {
        dispatch(addRatingFailure(error.toString()))
    }
}
