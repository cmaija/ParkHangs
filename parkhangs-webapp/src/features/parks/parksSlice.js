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

const parksSliceReducers = {
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
                  return park.name.toLowerCase().includes(query.toLowerCase())
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
              const sortedEvents = {};
              eventsArray.map((event) => {
                const key = event.parkId.toString()
                if (!(key in sortedEvents)) {
                sortedEvents[key] = [event];
              } else {
                sortedEvents[key].push(event)
              }
              })
              state.events = sortedEvents;
          },

          prepare(eventsArray) {
              return {
                  payload: {
                      eventsArray
                  }
              }
          }
      },

    addEventSuccessful: {
        reducer(state, action) {
            const {newEvent} = action.payload;
            const key = newEvent.id;
            if (!(key in state.events)) {
                state.events[key] = [newEvent];
            } else {
                state.events[key].push(event)
            }
        },
        prepare(newEvent) {
            return {
                payload: {
                    newEvent
                }
            }
        }
    },

      deleteEventSuccessful: {
          reducer (state, action) {
              const { deletedEventId, parkId } = action.payload
              const newEventArray = state.events[parkId].filter(event => event._id !== deletedEventId)
              console.log(newEventArray)
              state.events[parkId] = newEventArray
          },

          prepare (deletedEventId, parkId) {
              return {
                  payload: { deletedEventId, parkId }
              }
          }
      },

      deleteEventUnsuccessful: {
          reducer (state, action) {
              const { error } = action.payload
              state.deleteEventError = error
          },

          prepare (error) {
              return {
                  payload: { error }
              }
          }
      },

      updateEventSuccessful: {
          reducer (state, action) {
              const { updatedEvent, parkId } = action.payload
              const newEventArray = state.events[parkId].filter(event => event._id !== updatedEvent._id)
              newEventArray.push(updatedEvent)
              state.events[parkId] = newEventArray
          },

          prepare (updatedEvent, parkId) {
              return {
                  payload: { updatedEvent, parkId }
              }
          }
      },

      updateEventUnsuccessful: {
          reducer (state, action) {
              const { error } = action.payload
              state.updateEventError = error
          },

          prepare (error) {
              return {
                  payload: { error }
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
             return state.events[parkId]; //TODO: Phil can check if this works
          },
          prepare(parkId){
              return{
                  payload: {
                      parkId
                  }
              }
          }
      }
}

const parksSlice = createSlice({
    name: 'parks',
    initialState: {
        parks: [],
        filteredParks: [],
        events: {},
        eventsById: {},
        loading: 'idle',
        deleteEventError: null,
        updateEventError: null,
        //currentRequestId: undefined,
        error : null //for errors in AJAX calls
    },

    reducers: parksSliceReducers,

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
});

export const {
    selectPark,
    fetchEventsSuccessful,
    fetchParksSuccessful,
    addEventSuccessful,
    addEvent,
    deleteEvent,
    deleteEventSuccessful,
    deleteEventUnsuccessful,
    updateEventSuccessful,
    updateEventUnsuccessful,
    queryParks } = parksSlice.actions;
export default parksSlice.reducer
