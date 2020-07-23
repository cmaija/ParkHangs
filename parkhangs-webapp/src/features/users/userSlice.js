import {createSlice} from '@reduxjs/toolkit'
import UserService from 'services/user.service'

// import EventService from 'services/event.service'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        googleAccessToken: null, //TODO: should be here?
        isLoggedIn: false, // if user is not null, must be logged in
        error: null,
        loadingUser: true
    },

    reducers: {

        // googleLoginStart(state) {
        //
        // },
        //
        // googleLoginSuccessful(state, action) {
        //
        // },
        //
        // googleLoginFailure() {
        //
        // },

        setAccessToken(state, action) {
            state.googleAccessToken = action.payload;
        },

        googleLogoutStart() {

        },

        googleLogoutSuccessful(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.googleAccessToken = null;
        },

        googleLogoutFailure(state) {
            //TODO:

        },

        getUserStart(state) {
            state.user = null;
            state.isLoggedIn = false
        },

        getUserSuccessful(state, action) {

            if (action.payload != null) {
                state.user = action.payload;
                state.isLoggedIn = true;
            }
            // else don't do anything
        },

        getUserFailure(state, action) {
            //TODO
        },

        addUserStart(state, action) {

        },

        addUserSuccessful(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true
        },

        addUserFailure(station, action) {

        },

        updateUserStart(state, action) {

        },

        updateUserSuccessful(state, action) {
            state.user = action.payload;

        },

        updateUserFailure(station, action) {


        },


    }


});

export const {
    getUserStart,
    getUserSuccessful,
    getUserFailure,
    setAccessToken,
    googleLogoutSuccessful,
    addUserStart,
    addUserSuccessful,
    addUserFailure,
    googleLogoutFailure,
    updateUserStart,
    updateUserSuccessful,
    updateUserFailure
} = userSlice.actions;

export default userSlice.reducer;

const addUser = (userParams) => async (dispatch) => {

    //TODO: can't call this for some reason.
    try {
        dispatch(addUserStart());

        let newUser = {
            firstName: userParams.firstName,
            lastName: userParams.lastName,
            username: userParams.firstName.substring(0, 1) + userParams.lastName,
            email: userParams.email,
            googleImageURL: userParams.googleImageURL,
            savedParks: []
        };

        const successfulAddUser = await UserService.addUser(newUser);
        dispatch(addUserSuccessful(successfulAddUser));
    } catch (error) {
        dispatch(addUserFailure());

    }
};

export const getUser = (user) => async (dispatch) => {

    try {
        dispatch(getUserStart());
        const email = user.email;
        const successfulGetUser = await UserService.getUser(email);
        if (successfulGetUser == null) {

            //TODO:
            //addUser(getUserParameters);

            try {
                dispatch(addUserStart());

                let newUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.firstName.substring(0, 1) + user.lastName,
                    email: user.email,
                    googleImageURL: user.googleImageURL,
                    savedParks: []
                };

                const successfulAddUser = await UserService.addUser(newUser);
                dispatch(addUserSuccessful(successfulAddUser));
            } catch (error) {
                dispatch(addUserFailure());

            }


        } else {
            dispatch(getUserSuccessful(successfulGetUser))
        }
    } catch (error) {
        dispatch(getUserFailure());
    }
};

export const editUsername = (userId, username) => async (dispatch) => {

    try {

        dispatch(updateUserStart());

        const usernameObject = {
            username: username
        };

        const successfulUpdateUser = await UserService.updateUser(userId, usernameObject);
        dispatch(updateUserSuccessful(successfulUpdateUser));
    } catch (error) {
        dispatch(updateUserFailure())
    }
};

export const toggleSavedPark = (user, parkId) => async (dispatch) => {

    try {

        dispatch(updateUserStart());

        let newSavedParkArray = [...user.savedParks]; //copies original array to a local variable

        const parkIsAlreadySaved = newSavedParkArray.includes(parkId);

        if (parkIsAlreadySaved) {
            // remove the park
            newSavedParkArray = newSavedParkArray.filter((existingParkId) => existingParkId !== parkId);
        } else {
            // add the park
            newSavedParkArray.push(parkId);
        }

        const newSaveParksObject = {
            savedParks: newSavedParkArray
        };

        const successfulUpdateUser = await UserService.updateUser(user._id, newSaveParksObject);
        dispatch(updateUserSuccessful(successfulUpdateUser));

    } catch (error) {
        dispatch(updateUserFailure())
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch(googleLogoutSuccessful())
    } catch (error) {
        dispatch(googleLogoutFailure())
    }
}