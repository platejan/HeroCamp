import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function heroesReducer(state = initialState.heroes, action) {
  switch (action.type) {
    case types.HEROES_LOAD_SUCCESS:
      return Object.assign({}, state, action.heroes);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      console.log("me");
      return initialState.heroes;
    default:
      return state;
  }
}
