import { combineReducers } from 'redux'
import parksReducer from 'features/parks/parksSlice'
import modalReducer from 'features/modal/modalSlice'

export default combineReducers({
    parks: parksReducer,
    modal: modalReducer,
})
