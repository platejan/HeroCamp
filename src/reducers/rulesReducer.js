import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function rulesReducer(state = initialState.rules, action) {
  let newRules;
  let temp;
  switch (action.type) {
    case types.RULES_SETS_LOAD_SUCCESS:
      console.log("loaded_rulesSets:");
      console.log(action.rulesSets);
      newRules = Object.assign({}, initialState.rules, {});
      newRules.current = state.current;
      newRules.rulesSets = action.rulesSets;
      temp = 0;
      if (newRules.rulesSets)
        while (newRules.current == null && temp < Object.keys(newRules.rulesSets).length) {
          newRules.current = Object.keys(newRules.rulesSets)[temp];
          temp++;
        }
      console.log(newRules);
      return Object.assign({}, initialState.rules, newRules);
    case types.RULES_SET_SWITCH:
      newRules = Object.assign({}, initialState.rules, {});
      newRules.rulesSets = state.rulesSets;
      newRules.current = action.key;
      return Object.assign({}, initialState.rules, newRules);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.rules;
    default:
      return state;
  }
}
