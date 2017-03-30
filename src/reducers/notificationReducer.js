import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function notificationReducer(state = initialState.notification, action) {
  switch (action.type) {
    case types.NOTIFICATION_LOAD_SUCCESS:
      console.log(action.data);
      return Object.assign({}, initialState.notification, action.data);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.notification;
    default:
      return state;
  }
}
