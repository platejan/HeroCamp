import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chaptersReducer(state = initialState.chapters, action) {
  switch (action.type) {
    case types.CHAPTERS_LOAD_SUCCESS:
      console.log(action);
      return Object.assign({}, state, action.chapters);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.chapters;
    default:
      return state;
  }
}
