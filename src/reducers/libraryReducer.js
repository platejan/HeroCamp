import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.library, action) {
  switch (action.type) {
    case types.LIBRARY_LOAD_SUCCESS:
      console.log(action.data);
      return Object.assign({}, initialState.library, action.data);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.library;
    default:
      return state;
  }
}
