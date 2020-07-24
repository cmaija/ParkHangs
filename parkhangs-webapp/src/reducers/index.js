import { combineReducers } from 'redux'
import parksReducer from 'features/parks/parksSlice'
import eventsReducer from 'features/events/eventsSlice'
import modalReducer from 'features/modal/modalSlice'
import commentReducer from 'features/comments/commentSlice'

const rootReducer = combineReducers({
    parks: parksReducer,
    events: eventsReducer,
    modal: modalReducer,
    comments: commentReducer
})

export default rootReducer
