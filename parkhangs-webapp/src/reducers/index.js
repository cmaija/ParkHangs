import { combineReducers } from 'redux'
import parksReducer from 'features/parks/parksSlice'
import eventsReducer from 'features/events/eventsSlice'
import modalReducer from 'features/modal/modalSlice'
import userReducer from 'features/users/userSlice'

const rootReducer = combineReducers({
    parks: parksReducer,
    events: eventsReducer,
    modal: modalReducer,
    user: userReducer
})

export default rootReducer
