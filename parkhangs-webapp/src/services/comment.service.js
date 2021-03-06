import ApiService from 'services/api.service'

const CommentService = {
    getParkComments: async function () {
        const url = `/parkComments`
        try {
            const response = await ApiService.get(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    addParkComment: async function (newComment, user) {
      const url = `/parkComments`
      const object = {
        newComment: newComment,
        user: user
      }
      try {
        const response = await ApiService.post(url, object)
        return response.data.data
      } catch (error) {
        throw new Error(error.response)
      }
    },

    getEventComments: async function () {
        const url = `/eventComments`
        try {
            const response = await ApiService.get(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    addEventComment: async function (newComment, user) {
        const url = `/eventComments`
        const object = {
          newComment: newComment,
          user: user
        }
        try {
          const response = await ApiService.post(url, object)
          return response.data.data
        } catch (error) {
          throw new Error(error.response)
        }
    },

    deleteParkComment: async function (parkCommentId) {
        const url = `/parkComments/${parkCommentId}`
        try {
            const response = await ApiService.delete(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    deleteEventComment: async function (eventCommentId) {
        const url = `/eventComments/${eventCommentId}`
        try {
            const response = await ApiService.delete(url)
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    }
}

export default CommentService
