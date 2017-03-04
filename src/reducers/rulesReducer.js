import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function rulesReducer(state = initialState.rules, action) {
  let newRules;
  let temp;
  switch (action.type) {
    case types.RULES_SETS_LOAD_SUCCESS:
      newRules = Object.assign({}, initialState.rules, {});
      newRules.current = state.current;
      newRules.rulesSets = action.rulesSets;
      newRules.rules = state.rules;
      temp = 0;
      if (newRules.rulesSets)
        while (newRules.current == null && temp < Object.keys(newRules.rulesSets).length) {
          if(!newRules.rulesSets[Object.keys(newRules.rulesSets)[temp]].delete)
          newRules.current = Object.keys(newRules.rulesSets)[temp];
          temp++;
        }
      return Object.assign({}, initialState.rules, newRules);
    case types.RULES_SET_DELETE:
      newRules = Object.assign({}, initialState.rules, {});
      newRules.rulesSets = state.rulesSets;
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
      newRules = Object.assign({}, initialState.rules, {});
      newRules.rulesSets = state.rulesSets;
      newRules.current = action.key;
      newRules.rules = initialState.rules.rules;
      return Object.assign({}, initialState.rules, newRules);
    case types.RULES_LOAD_SUCCESS:
      newRules = Object.assign({}, initialState.rules, {});
      newRules.rulesSets = state.rulesSets;
      newRules.current = state.current;
      newRules.rules = action.rules;
      return Object.assign({}, initialState.rules, newRules);
    case types.RULES_SET_CREATED:
      console.log("rules created key: "+action.current);
      newRules = Object.assign({}, initialState.rules, {});
      newRules.rulesSets = state.rulesSets;
      newRules.current = action.current;
      newRules.rules =  initialState.rules.rules;
      return Object.assign({}, initialState.rules, newRules);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.rules;
    default:
      return state;
  }
}
