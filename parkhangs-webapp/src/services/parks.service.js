import ApiService from 'services/api.service'
import qs from 'qs'

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

    queryParks: async function (params) {
        const config = {
            params: params,
            paramsSerializer: function(params) {
                return qs.stringify(params)
            },
        }

        const url = `/queryParks`
        try {
            const response = await ApiService.get(url, config)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    getParksSimple: async function () {
        const url = `/parksSimple`
        try {
            const response = await ApiService.get(url)
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
          const response = await ApiService.patch(url, object)
          return response.data.data
      } catch (error) {
          throw new Error(error.response)
      }
  },

  getFacilityTypes: async function () {
      const url = `/facilityTypes`
      try {
          const response = await ApiService.get(url)
          return response.data.data
      } catch (error) {
          throw new Error(error.response)
      }
  },

  getSpecialFeatures: async function () {
      const url = `/parkSpecialFeatures`
      try {
          const response = await ApiService.get(url)
          return response.data.data
      } catch (error) {
          throw new Error(error.response)
      }
  },
}

export default ParkService
