import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chaptersReducer(state = initialState.currentStory, action) {
  let newState;
  switch (action.type) {
    case types.CURRENT_STORY_HEROES_CLEAR:
      newState = Object.assign({}, state, {});
      newState.heroes = {};
      return newState;
    case types.CURRENT_STORY_SET_HERO:
      newState = Object.assign({}, state, {});
      newState.selectedHero = action.key;
      return newState;
    case types.CURRENT_STORY_POTENTIAL_RECRUIT_CLEAR:
      newState = Object.assign({}, state, {});
      newState.potentialRecruits = {};
      return newState;
    case types.CURRENT_STORY_CLEAR:
      return initialState.currentStory;
    case types.CURRENT_STORY_POTENTIAL_RECRUIT_LOAD:
      newState = Object.assign({}, state, {});
      newState.potentialRecruits = Object.assign({}, newState.potentialRecruits, {[action.key]: action.data});
      return newState;
    case types.CURRENT_STORY_HERO_LOAD:
      newState = Object.assign({}, state, {});
      newState.heroes = Object.assign({}, newState.heroes, {[action.key]: action.data});
      return newState;
    default:
      return state;
  }
}
