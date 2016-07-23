import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function runsReducer(state = initialState.runs, action) {
  switch (action.type) {
    case types.RUNS_LOAD_SUCCESS:
      return Object.assign({}, state, action.runs);
    default:
      return state;
  }
}
