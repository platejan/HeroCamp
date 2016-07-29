import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chaptersReducer(state = initialState.chapters, action) {
  switch (action.type) {
    case types.CHAPTERS_LOAD_SUCCESS:
      return Object.assign({}, state, action.chapters);
    default:
      return state;
  }
}
