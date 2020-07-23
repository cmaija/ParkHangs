import { createSlice } from '@reduxjs/toolkit'
import EventService from 'services/event.service'

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        eventsByParkId: {},
        flattenedEvents: [],
        loadingEvents: true,
        updatingEvent: false,
        deletingEvent: false,
        addingEvent: false,
        error : null
    },
    reducers: {
        fetchEventsStart (state) {
            state.loadingParks = true
            state.error = null
        },

        fetchEventsSuccessful (state, action) {
            const events = action.payload
            state.flattenedEvents = action.payload
            const parsedEvents = events.reduce(function (acc, event) {
                const parkId = event.parkId.toString()
                const hasSeenParkSoFar = !!acc[parkId]
                if (hasSeenParkSoFar) {
                    acc[parkId].push(event)
                }
                else {
                    acc[parkId] = [event]
                }
                return acc
            }, {})

            state.eventsByParkId = parsedEvents
        },

        fetchEventsFailure (state, action) {
            state.loadingEvents = false
            state.error = action.payload
        },

        addEventStart (state, action) {
            state.addingEvent = true
            state.error = null
        },

        addEventSuccessful (state, action) {
            const newEvent = action.payload
            const parkId = newEvent.parkId
            const currentEvents = state.eventsByParkId[parkId]
            if (!currentEvents) {
                state.eventsByParkId[parkId] = []
            }
            currentEvents.push(newEvent)
            state.eventsByParkId[parkId] = currentEvents

            const flattenedEvents = state.flattenedEvents
            flattenedEvents.push(newEvent)
            state.flattenedEvents = flattenedEvents

            state.addingEvent = false
            state.error = null
        },

        addEventFailure (state, action) {
            state.addingEvent = false
            state.error = action.payload
        },

        updateEventStart (state, action) {
            state.updatingEvent = true
            state.error = null
        },

        updateEventSuccessful (state, action) {
            const updatedEvent = action.payload
            const parkId = updatedEvent.parkId
            const eventId = updatedEvent._id
            const newEventArray = state.eventsByParkId[parkId].filter(event => event._id !== eventId)
            newEventArray.push(updatedEvent)
            state.eventsByParkId[parkId] = newEventArray

            const newFlattenedEventArray = state.flattenedEvents.filter(event => event._id !== eventId)
            newFlattenedEventArray.push(updatedEvent)
            state.flattenedEvents = newFlattenedEventArray


            state.updatingEvent = false
            state.error = null
        },

        updateEventFailure (state, action) {
            state.updatingEvent = true
            state.error = action.payload
        },

        deleteEventStart (state, action) {
            state.deletingEvent = true
            state.error = null
        },

        deleteEventSuccessful (state, action) {
            const { _id, parkId } = action.payload

            const newEventArray = state.eventsByParkId[parkId].filter(event => event._id !== _id)
            state.eventsByParkId[parkId] = newEventArray

            const newFlattenedEventArray = state.flattenedEvents.filter(event => event._id !== _id)
            state.flattenedEvents = newFlattenedEventArray

            state.updatingEvent = false
            state.error = null
        },

        deleteEventFailure (state, action) {
            state.deletingEvent = true
            state.error = action.payload
        },
    }
})

export const {
    fetchEventsStart,
    fetchEventsSuccessful,
    fetchEventsFailure,
    addEventStart,
    addEventSuccessful,
    addEventFailure,
    updateEventStart,
    updateEventSuccessful,
    updateEventFailure,
    deleteEventStart,
    deleteEventSuccessful,
    deleteEventFailure,
} = eventSlice.actions

export default eventSlice.reducer

export const fetchEvents = () => async dispatch => {
    try {
        dispatch(fetchEventsStart())
        const parks = await EventService.getEvents()
        dispatch(fetchEventsSuccessful(parks))
    } catch (error) {
        dispatch(fetchEventsFailure(error.toString()))
    }
}

export const addEvent = (newEvent) => async dispatch => {
    try {
        dispatch(addEventStart())
        const successfulNewEvent = await EventService.addEvent(newEvent)
        dispatch(addEventSuccessful(successfulNewEvent))
    } catch (error) {
        dispatch(addEventFailure(error.toString()))
    }
}

export const updateEvent = (updatedEvent) => async dispatch => {
    try {
        dispatch(updateEventStart())
        const successfulUpdatedEvent = await EventService.updateEvent(updatedEvent)
        dispatch(updateEventSuccessful(successfulUpdatedEvent))
    } catch (error) {
        dispatch(updateEventFailure(error.toString()))
    }
}

export const deleteEvent = (eventId, parkId) => async dispatch => {
    try {
        dispatch(deleteEventStart())
        const successfulDeletedEvent = await EventService.deleteEvent(eventId, parkId)
        dispatch(deleteEventSuccessful(successfulDeletedEvent))
    } catch (error) {
        dispatch(deleteEventFailure(error.toString()))
    }
}
