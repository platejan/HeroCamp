import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function createItem(item,callback){
  return (dispatch, getState) => {
    item.autor = getState().auth.currentUserUID;
    let itemKey = firebase.database().ref().child('library').push().key;
    dispatch(updateItem(itemKey, item,callback));
  };
}

export function updateItem(itemKey, item, callback){
  return (dispatch, getState) => {
    let updates = {};
    updates['/library/'+itemKey] = item;
    firebase.database().ref().update(updates, callback);
  };
}

export function deleteItem(itemKey, callback){
  console.log("deleting...");
  return (dispatch, getState) => {
    let updates = {};
    updates['/library/'+itemKey+'/delete/'] = true;
    firebase.database().ref().update(updates, callback);
  };
}

export function loadLibrary() {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/library/');
    ref.on('value', (snapshot) => {
      dispatch(loadLibraryList(snapshot.val()));
    });
  };
}

export function loadLibraryList(stories) {
  return {
    type: types.LIBRARY_LOAD_SUCCESS, data: stories
  };
}


