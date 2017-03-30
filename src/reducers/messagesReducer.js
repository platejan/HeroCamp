import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.MESSAGES_LOAD_SUCCESS:
      console.log(action.data);
      return Object.assign({}, initialState.messages, action.data);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.messages;
    default:
      return state;
  }
}
