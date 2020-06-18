import { combineReducers } from 'redux'
import parksReducer from '../features/parks/parksSlice'

export default combineReducers({
  parks: parksReducer,
})
