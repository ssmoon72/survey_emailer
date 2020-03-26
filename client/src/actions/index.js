import axios from 'axios';
import { FETCH_USER } from './types';

//whenever action creator gets called, instantly return a function

//get user model from database
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type:FETCH_USER, payload: res.data });
};

//action creator to process payment and add credits to user model
export const handleToken = (token) => async dispatch => {
  //use post because sending information and request to backend
  const res = await axios.post('/api/stripe', token);

  //dispatch fetch_user to update header
  dispatch({ type: FETCH_USER, payload: res.data });
};
