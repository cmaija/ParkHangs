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
    },

    addRating: async function (parkIdAndRating) {
        const url = `/parks`
        try {
            const response = await ApiService.patch(url, parkIdAndRating)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },


    getParkById: async function (id) {
        const url = `/parks/${id}/`
        try {
            const response = await ApiService.get(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    addRating: async function (parkId, rating) {
      const url = `/parks/${parkId}/`
      const object = {
          parkId: parkId,
          rating: rating
      }
      try {
        console.log(object)
          const response = await ApiService.patch(url, object)
          return response.data.data
      } catch (error) {
          throw new Error(error.response)
      }
    }
}

export default ParkService
