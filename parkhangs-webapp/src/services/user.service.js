import ApiService from 'services/api.service'

const UserService = {

    getUser: async function (email) {
        const url = `/user/${email}`;
        try {
            const response = await ApiService.get(url);
            return response.data.data
        } catch (error) {
            throw new Error(error.response)
        }
    },

    addUser: async function (user) {

        const url = `/user`;
        try {
            const response = await ApiService.post(url, user);
            return response.data.newUser
        } catch (error) {
            throw new Error(error.response)
        }
    },

    updateUser: async function (userId, updatedUserParam) {

        const url = `/user/${userId}`;

        try {
            const response = await ApiService.patch(url, updatedUserParam);
            return response.data.updatedUser;
        } catch (error) {
            throw new Error(error.response)
        }
    },
};

export default UserService
