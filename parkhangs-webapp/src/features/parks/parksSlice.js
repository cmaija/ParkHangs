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
        addRatingStart (state) {
            state.addingRating = true
            state.error = null
        },

        addRatingSuccessful (state, action) {
            const parkId = action.payload.parkId
            const rating = action.payload.rating
            const newParkArray = state.parks.map((park) => {
              if (park.Id === parkId) {
                park.ratings.push(rating)
              }
            })
            state.parks = newParkArray
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
    },
})

export const {
    fetchParksStart,
    fetchParksSuccessful,
    fetchParksFailure,
    filterParks,
    addRatingStart,
    addRatingSuccessful,
    addRatingFailure
} = parksSlice.actions

export default parksSlice.reducer

export const fetchParks = () => async dispatch => {
    try {
        dispatch(fetchParksStart())
        const parks = await ParkService.getParks()
        dispatch(fetchParksSuccessful(parks))
    } catch (error) {
        dispatch(fetchParksFailure(error.toString()))
    }
}

export const addRating = (parkIdAndRating) => async dispatch => {
    try {
        dispatch(addRatingStart())
        const response = await ParkService.addRating(parkIdAndRating)
        dispatch(addRatingSuccessful(parkIdAndRating))
    } catch (error) {
        dispatch(addRatingFailure(error.toString()))
    }
}
