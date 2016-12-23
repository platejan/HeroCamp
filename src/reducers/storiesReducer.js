import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function storiesReducer(state = initialState.stories, action) {
  switch (action.type) {
    case types.STORIES_LOAD_SUCCESS:
      return Object.assign({}, state, action.stories);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.stories;
    default:
      return state;
  }
}
