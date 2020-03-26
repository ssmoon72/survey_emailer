//reducer index.js file
import { combineReducers } from 'redux'
import authReducer from './authReducer';

//keys passed into combineReducers represent keys in the state object
export default combineReducers({
  auth: authReducer
});
