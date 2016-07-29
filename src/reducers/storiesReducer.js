import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function storiesReducer(state = initialState.stories, action) {
  switch (action.type) {
    default:
      return state;
  }
}
