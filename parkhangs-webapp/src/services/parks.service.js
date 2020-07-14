import ApiService from 'services/api.service'

const ParkService = {
    getParks: async function () {
        const url = `/parks`
        try {
            const response = await ApiService.get(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    getEventsByParkId: async function (id) {
        const url = `/parks/${id}/events`
        try {
            const response = await ApiService.get(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    }
}

export default ParkService
