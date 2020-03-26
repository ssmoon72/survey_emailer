import { FETCH_USER } from '../actions/types';

//decides whether or not a user is logged in
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
