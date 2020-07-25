import ApiService from 'services/api.service'

const EventService = {
    getEvents: async function () {
        const url = `/events`
        try {
            const response = await ApiService.get(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    addEvent: async function (user, newEvent) {
        const url = `/events`

        const object = {
            user: user,
            newEvent: newEvent
        }

        try {
            const response = await ApiService.post(url, object)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    updateEvent: async function (updatedEvent) {
        const eventId = updatedEvent.eventId
        const url = `/events/${eventId}`
        try {
            const response = await ApiService.patch(url, updatedEvent)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    getEventById: async function (eventId) {
        const url = `/events/${eventId}`
        try {
            const response = await ApiService.get(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    deleteEvent: async function (eventId) {
        const url = `/events/${eventId}`
        try {
            const response = await ApiService.delete(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },
}

export default EventService
