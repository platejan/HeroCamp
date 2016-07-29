import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function heroesReducer(state = initialState.heroes, action) {
  switch (action.type) {
    default:
      return state;
  }
}
