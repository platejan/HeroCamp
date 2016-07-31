import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function heroesReducer(state = initialState.heroes, action) {
  console.log("Heroes reducer default");
  switch (action.type) {
    case types.HEROES_LOAD_SUCCESS:
      console.log("Heroes reducer");
      return Object.assign({}, state, action.heroes);
    default:
      return state;
  }
}
