import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import firebase from 'firebase';

import { authLoggedIn } from './authActions';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

function extractUserProperties(firebaseUser) {

  const user = {};
  const userProperties = [
    'displayName',
    'email',
    'emailVerified',
    'isAnonymous',
    'photoURL',
    'providerData',
    'providerId',
    'refreshToken',
    'uid',
    'isAdmin'
  ];

  userProperties.map((prop) => {
    if (prop in firebaseUser) {
      user[prop] = firebaseUser[prop];
    }
  });

  return user;
}

export function userCreated(user) {
  return (dispatch) => {
    firebaseApi.databaseSet('/users/' + user.uid, extractUserProperties(user))
      .then(
        () => {
          dispatch(authLoggedIn(user.uid),true);
          dispatch(userCreatedSuccess());
        })
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw(error);
        });
  };
}

export function userCreatedSuccess() {
  return {
    type: types.USER_CREATED_SUCCESS
  };
}

export function userLoadedSuccess(user) {
  return {
    type: types.USER_LOADED_SUCCESS, user: extractUserProperties(user)
  };
}

export function userIsAdminSuccess() {
  return {
    type: types.USER_IS_ADMIN_SUCCESS
  };
}
export function usernameLoaded(username) {
  return {
    type: types.USER_DISPLAYNAME_LOADED, name: username
  };
}

export function setUsername(username, callback){
  return (dispatch, getState) => {
    let user = getState().auth.currentUserUID;
    let updates = {};
    updates['/users/'+user+'/displayName'] = username;
    updates['/usernames/'+user+'/name'] = username;
    firebase.database().ref().update(updates, callback);
  };
}
export function loadUsername(){
  return (dispatch, getState) => {
    let user = getState().auth.currentUserUID;
    let ref = firebase.database().ref('/users/'+user+'/displayName');
    ref.on('value', (snapshot) => {
      dispatch(usernameLoaded(snapshot.val()));
    });
  };
}

export function loadUsersNames() {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/usernames/');
    ref.on('value', (snapshot) => {
      dispatch(loadUsersNamesList(snapshot.val()));
    });
  };
}

export function loadUsersNamesList(usernames) {
  return {
    type: types.USERNAMES_LOAD_SUCCESS, data: usernames
  };
}
