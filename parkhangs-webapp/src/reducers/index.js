import { combineReducers } from 'redux'
import parksReducer from 'features/parks/parksSlice'
import eventsReducer from 'features/events/eventsSlice'
import modalReducer from 'features/modal/modalSlice'

const rootReducer = combineReducers({
    parks: parksReducer,
    events: eventsReducer,
    modal: modalReducer,
})

export default rootReducer
