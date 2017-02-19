import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function createRulesSet(RulesSet,callback){
  return (dispatch, getState) => {
    RulesSet.autor = getState().auth.currentUserUID;
    let newRulesSet = firebase.database().ref().child('rules').push().key;
    dispatch(updateRulesSet(RulesSet,newRulesSet,callback));
  };
}

export function updateRulesSet(RulesSet,RulesSetKey,callback){
  return (dispatch, getState) => {
    let updates = {};
    updates['/rules/'+RulesSetKey] = RulesSet;
    firebase.database().ref().update(updates, callback);
  };
}

export function deleteRulesSet(Key, callback){
  return (dispatch, getState) => {
    let updates = {};
    updates['/rules/'+Key+'/delete'] = true;
    firebase.database().ref().update(updates, callback);
  };
}
export function switchRulesSet(key) {
  return {
    type: types.RULES_SET_SWITCH, key
  };
}

export function loadRulesSets() {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/rules/');
    console.log("start loading rulesSets...");
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

export function createRule(RulesSetKey,rule,callback){
  return (dispatch, getState) => {
    let RuleKey = firebase.database().ref().child('rules').child(RulesSetKey).child('rules').push().key;
    dispatch(updateRule(RulesSetKey, RuleKey, rule,callback));
  };
}

export function updateRule(RulesSetKey, RuleKey, rule, callback){
  return (dispatch, getState) => {
    let updates = {};
    updates['/rules/'+RulesSetKey+'/rules/'+RuleKey] = rule;
    firebase.database().ref().update(updates, callback);
  };
}

export function deleteRule(RulesSetKey, Key, callback){
  return (dispatch, getState) => {
    let updates = {};
    updates['/rules/'+RulesSetKey+'/rules/'+Key+'/delete'] = true;
    firebase.database().ref().update(updates, callback);
  };
}
