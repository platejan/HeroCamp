import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.usernames, action) {
  switch (action.type) {
    case types.USERNAMES_LOAD_SUCCESS:
      console.log(action.data);
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
