import axios from 'axios'

const ApiService = {
    async init() {
        axios.defaults.baseURL = process.env.REACT_APP_API_ROOT
    },

    get(resource, config) {
        return axios.get(resource, config)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    patch(resource, data) {
        return axios.patch(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
     **/
    customRequest(data) {
        return axios(data)
    },
}

export default ApiService
