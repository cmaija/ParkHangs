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
        queriedParks: [],
        parksHaveBeenQueried: false,
        loadingParks: true,
        addingRating: false,
        error : null,
        selectedPark: {},
        loadingParkDetails: false,
        loadingFacilities: false,
        loadingSpecialFeatures: false,
        facilities: [],
        specialFeatures: [],
        currentFilters: {},
    },

    reducers: {
        selectParkStart (state) {
            state.loadingParkDetails = true
            state.error = null
        },

        selectParkSuccessful (state, action) {
            state.selectedPark = action.payload
            state.loadingParkDetails = false
            state.error = null
        },

        selectParkFailure (state, action) {
            state.loadingParkDetails = false
            state.error = action.payload
        },

        fetchParksStart (state) {
            state.loadingParks = true
            state.error = null
        },

        fetchParksSuccessful (state, action) {
            const parks = action.payload.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            })

            state.parks = parks
            state.loadingParks = false
            state.error = null
        },

        fetchParksFailure (state, action) {
            state.loadingParks = false
            state.error = action.payload
        },

        queryParksStart (state) {
            state.loadingParks = true
            state.error = null
        },

        queryParksSuccessful (state, action) {
            const parks = action.payload
            state.queriedParks = parks
            state.parksHaveBeenQueried = true
            state.loadingParks = false
            state.error = null
        },

        queryParksFailure (state, action) {
            state.loadingParks = false
            state.error = action.payload
        },

        getFacilityTypesStart (state) {
            state.loadingFacilities = true
            state.error = null
        },

        getFacilityTypesSuccessful (state, action) {
            state.facilities = action.payload
            state.loadingFacilities = false
            state.error = null
        },

        getFacilityTypesFailure (state, action) {
            state.loadingFacilities = false
            state.error = action.payload
        },

        getSpecialFeaturesStart (state) {
            state.loadingSpecialFeatures = true
            state.error = null
        },

        getSpecialFeaturesSuccessful (state, action) {
            state.specialFeatures = action.payload
            state.loadingSpecialFeatures = false
            state.error = null
        },

        getSpecialFeaturesFailure (state, action) {
            state.loadingSpecialFeatures = false
            state.error = action.payload
        },

        filterParks (state, action) {
            const query = action.payload
            let filteredParks = []
            for (let parkName of query) {
                filteredParks.push(...state.parks.filter((park) => {
                    return park.name.toLowerCase().includes(parkName.toLowerCase())
                }))
            }

            state.filteredParks = filteredParks
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
            let newParksList = state.parks.filter(park => park._id !== updatedPark._id)
            newParksList.push(updatedPark)
            state.parks = newParksList

            state.addingRating = false
            state.error = null
        },

        addRatingFailure (state, action) {
            state.addingRating = false
            state.error = action.payload
        },

        resetQuery (state, action) {
            state.parksHaveBeenQueried = false
        },

        saveFilterState (state, action) {
            state.currentFilters = action.payload
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
    queryParksStart,
    queryParksSuccessful,
    queryParksFailure,
    filterParks,
    updateParkByIdStart,
    updateParkByIdSuccessful,
    updateParkByIdFailure,
    selectParkStart,
    selectParkSuccessful,
    selectParkFailure,
    addRatingStart,
    addRatingSuccessful,
    addRatingFailure,
    getFacilityTypesStart,
    getFacilityTypesSuccessful,
    getFacilityTypesFailure,
    getSpecialFeaturesStart,
    getSpecialFeaturesSuccessful,
    getSpecialFeaturesFailure,
    resetQuery,
    saveFilterState,
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
        const parks = await ParkService.getParksSimple()
        dispatch(fetchParksSuccessful(parks))
    } catch (error) {
        dispatch(fetchParksFailure(error.toString()))
    }
}

export const queryParks = (queryParams) => async dispatch => {
    try {
        dispatch(queryParksStart())
        const parks = await ParkService.queryParks(queryParams)
        dispatch(queryParksSuccessful(parks))
    } catch (error) {
        dispatch(queryParksFailure(error.toString()))
    }
}

export const fetchFacilityTypes = () => async dispatch => {
    try {
        dispatch(getFacilityTypesStart())
        const facilities = await ParkService.getFacilityTypes()
        dispatch(getFacilityTypesSuccessful(facilities))
    } catch (error) {
        dispatch(getFacilityTypesFailure(error.toString()))
    }
}

export const fetchSpecialFeatures = () => async dispatch => {
    try {
        dispatch(getSpecialFeaturesStart())
        const specialFeatures = await ParkService.getSpecialFeatures()
        dispatch(getSpecialFeaturesSuccessful(specialFeatures))
    } catch (error) {
        dispatch(getSpecialFeaturesFailure(error.toString()))
    }
}

export const selectPark = (parkId) => async dispatch => {
    try {
        dispatch(selectParkStart())
        const park = await ParkService.getParkById(parkId)
        dispatch(selectParkSuccessful(park))
    } catch (error) {
        dispatch(selectParkFailure(error.toString()))
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
