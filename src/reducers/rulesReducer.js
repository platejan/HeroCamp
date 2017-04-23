import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function rulesReducer(state = initialState.rules, action) {
  let newRules;
  let temp;
  switch (action.type) {
    case types.RULES_SETS_LOAD_SUCCESS:
      newRules = Object.assign({}, initialState.rules, state);
      newRules.rulesSets = action.rulesSets;
      temp = 0;
      if (newRules.rulesSets)
        while (newRules.current == null && temp < Object.keys(newRules.rulesSets).length) {
          if(!newRules.rulesSets[Object.keys(newRules.rulesSets)[temp]].delete)
          newRules.current = Object.keys(newRules.rulesSets)[temp];
          temp++;
        }
      return Object.assign({}, initialState.rules, newRules);
    case types.RULES_SET_DELETE:
      newRules = Object.assign({}, initialState.rules, state);
      temp = 0;
      if (newRules.rulesSets)
        while (newRules.current == null && temp < Object.keys(newRules.rulesSets).length) {
          if(!newRules.rulesSets[Object.keys(newRules.rulesSets)[temp]].delete)
            newRules.current = Object.keys(newRules.rulesSets)[temp];
          temp++;
        }
      newRules.rules = initialState.rules.rules;
      return Object.assign({}, initialState.rules, newRules);
    case types.RULES_SET_SWITCH:
      newRules = Object.assign({}, initialState.rules, state);
      newRules.current = action.key;
      newRules.rules = initialState.rules.rules;
      return Object.assign({}, initialState.rules, newRules);
    case types.RULES_LOAD_SUCCESS:
      newRules = Object.assign({}, initialState.rules, state);
      newRules.rules = action.rules;
      return Object.assign({}, initialState.rules, newRules);
    case types.RULES_SET_CREATED:
      newRules = Object.assign({}, initialState.rules, state);
      newRules.current = action.current;
      newRules.rules =  initialState.rules.rules;
      return Object.assign({}, initialState.rules, newRules);
    case types.PUBLIC_RULES_LOADED:
      newRules = Object.assign({}, initialState.rules, state);
      temp = {};
      temp[action.rulesSetKey] = action.publicRules;
      newRules.publicRules = Object.assign({}, newRules.publicRules, temp);
      return Object.assign({}, initialState.rules, newRules);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.rules;
    default:
      return state;
  }
}
