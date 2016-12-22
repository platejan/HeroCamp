import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chaptersReducer(state = initialState.currentStory, action) {
  let newState;
  switch (action.type) {
    case types.CURRENT_STORY_POTENTIAL_RECRUIT_LOAD:
      newState = Object.assign({}, state, {});
      newState.potentialRecruits = Object.assign({}, newState.potentialRecruits, {[action.key]: action.data});
      console.log(newState);
      return newState;
    default:
      return state;
  }
}
