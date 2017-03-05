import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function createRulesSet(RulesSet, callback) {
  return (dispatch, getState) => {
    RulesSet.autor = getState().auth.currentUserUID;
    let newRulesSet = firebase.database().ref().child('rulesSets').push().key;
    dispatch(updateRulesSet(RulesSet, newRulesSet, callback, true));
  };
}

export function updateRulesSet(RulesSet, RulesSetKey, callback, newSet = false) {
  return (dispatch, getState) => {
    let updates = {};
    updates['/rulesSets/' + RulesSetKey] = RulesSet;
    firebase.database().ref().update(updates, callback);
    if (newSet) {
      dispatch(createRulesSetSuccess(RulesSetKey));
    }
  };
}

export function deleteRulesSet(Key, callback) {
  return (dispatch, getState) => {
    let updates = {};
    updates['/rulesSets/' + Key + '/delete'] = true;
    firebase.database().ref().update(updates, callback);
    dispatch(deleteSetActionType());
  };
}
export function deleteSetActionType() {
  return {
    type: types.RULES_SET_DELETE
  };
}
export function switchRulesSet(key) {
  return {
    type: types.RULES_SET_SWITCH, key
  };
}
export function createRulesSetSuccess(key) {
  return {
    type: types.RULES_SET_CREATED, current: key
  };
}

export function loadRulesSets() {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/rulesSets/');
    ref.on('value', (snapshot) => {
      dispatch(loadRulesSetsList(snapshot.val()));
    });
  };
}

export function loadRulesSetsList(rulesSets) {
  return {
    type: types.RULES_SETS_LOAD_SUCCESS, rulesSets
  };
}
export function loadRules(RulesSetKey) {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/rules/drafts/' + RulesSetKey + '/');
    ref.on('value', (snapshot) => {
      dispatch(loadRulesList(snapshot.val()));
    });
  };
}

export function loadRulesList(rules) {
  return {
    type: types.RULES_LOAD_SUCCESS, rules
  };
}
export function createRule(RulesSetKey, rule, callback) {
  return (dispatch, getState) => {
    let RuleKey = firebase.database().ref().child('rules').child('drafts').child(RulesSetKey).push().key;
    dispatch(updateRule(RulesSetKey, RuleKey, rule, callback));
  };
}

export function publishRulesSet(RulesSetKey, RulesSet, rules, callback) {
  return (dispatch, getState) => {
    let updates = {};
    updates['/rules/public/' + RulesSetKey] = rules;
    updates['/rulesSets/' + RulesSetKey] = RulesSet;
    firebase.database().ref().update(updates, callback);
  };
}
export function rejectRulesSet(RulesSetKey, callback) {
  return (dispatch, getState) => {
    let updates = {};
    updates['/rulesSets/' + RulesSetKey + '/hasChange'] = false;
    firebase.database().ref().update(updates, callback);

    let ref = firebase.database().ref('/rules/public/' + RulesSetKey + '/');
    ref.on('value', (snapshot) => {
      dispatch(copyRulesToDraft(RulesSetKey, snapshot.val()));
    });
  };
}
export function copyRulesToDraft(RulesSetKey, rules) {
  return () => {
    let updates = {};
    updates['/rules/drafts/' + RulesSetKey] = rules;
    firebase.database().ref().update(updates);
  }
}
export function updateRule(RulesSetKey, RuleKey, rule, callback) {
  return (dispatch, getState) => {
    let updates = {};
    updates['/rules/drafts/' + RulesSetKey + '/' + RuleKey] = rule;
    updates['/rulesSets/' + RulesSetKey + '/hasChange'] = true;
    firebase.database().ref().update(updates, callback);
  };
}

export function deleteRule(RulesSetKey, Key, callback) {
  return (dispatch, getState) => {
    let updates = {};
    updates['/rules/drafts/' + RulesSetKey + '/' + Key + '/delete'] = true;
    updates['/rulesSets/' + RulesSetKey + '/hasChange'] = true;
    firebase.database().ref().update(updates, callback);
  };
}
