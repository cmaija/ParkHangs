import { createSlice } from '@reduxjs/toolkit'
import UserService from 'services/user.service'
import { updateParkById } from 'features/parks/parksSlice'
import { updateEventById } from 'features/events/eventsSlice'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoggedIn: false, // if user is not null, must be logged in
        error: null,
        gettingUserLocation: true,
        userLocation: null,
    },

    reducers: {

        setAccessToken(state, action) {
            state.googleAccessToken = action.payload;
        },

        googleLogoutSuccessful(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.googleAccessToken = null;
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

        addUserSuccessful(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true
        },

        getUserLocationStart (state, action) {
            state.gettingUserLocation = true
        },

        getUserLocationSuccess (state, action) {
            state.gettingUserLocation = false
            const lat = action.payload.lat
            const lng = action.payload.lon
            state.userLocation = {
                lat,
                lng
            }
        },

        getUserLocationFailure (state, action) {
            state.gettingUserLocation = false
            state.location = null
        },
    }
});

export const {
    setAccessToken,
    getUserStart,
    getUserSuccessful,
    getUserFailure,
    googleLogoutSuccessful,
    addUserStart,
    addUserSuccessful,
    addUserFailure,
    googleLogoutFailure,
    updateUserStart,
    updateUserSuccessful,
    updateUserFailure,
    getUserLocationStart,
    getUserLocationSuccess,
    getUserLocationFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const getUserLocation = () => async (dispatch) => {
    try {
        dispatch(getUserLocationStart())
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            dispatch(getUserLocationSuccess({lat, lon}))
        })
    } catch (error) {
        dispatch(getUserLocationFailure())
    }
}


export const getUser = (user) => async (dispatch) => {

    try {
        dispatch(getUserStart());

        const email = user.email;
        const successfulGetUser = await UserService.getUser(email);

        if (successfulGetUser == null) {

            //this adds a new user to the database
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
        dispatch(updateParkById(parkId))
        dispatch(updateUserSuccessful(successfulUpdateUser));

    } catch (error) {
        dispatch(updateUserFailure())
    }
}


export const toggleSavedEvent = (user, eventId) => async (dispatch) => {
    try {

        dispatch(updateUserStart())

        let newSavedEventArray = []
        if (user.savedEvents) {
            newSavedEventArray = [...user.savedEvents]
        }

        const eventIsAlreadySaved = newSavedEventArray.includes(eventId)

        if (eventIsAlreadySaved) {
            newSavedEventArray = newSavedEventArray.filter((oldEvent) => oldEvent !== eventId)
        } else {
            newSavedEventArray.push(eventId)
        }

        const newSavedEventsObject = {
            savedEvents: newSavedEventArray
        }

        const successfulUpdateUser = await UserService.updateUser(user._id, newSavedEventsObject)
        dispatch(updateEventById(eventId))
        dispatch(updateUserSuccessful(successfulUpdateUser));

    } catch (error) {
        dispatch(updateUserFailure())
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch(googleLogoutSuccessful())
    } catch (error) {
        dispatch(googleLogoutFailure())
    }
}
