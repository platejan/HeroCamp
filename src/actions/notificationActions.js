import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function createNotification(content, users, callback = ()=> {
}) {
  return (dispatch, getState) => {
    console.log("notification action");
    if (users != null && (typeof users === 'string' || users instanceof String)) {
      console.log("creating notification for user " + users);
      let notificationKey = firebase.database().ref().child('notification').child(users).push().key;
      dispatch(updateNotification(users, notificationKey, content, callback));
    } else if (users != null) {
      console.log(users);
      Object.keys(users).forEach(function (key) {
        dispatch(createNotification(content, users[key]));
      });
    }
  };
}

export function updateNotification(UserKey, notificationKey, notification, callback) {
  return (dispatch, getState) => {
    let updates = {};
    updates['/notification/' + UserKey + '/' + notificationKey] = notification;

    firebase.database().ref().update(updates, callback);
  };
}

export function deleteNotification(UserKey, Key, callback) {
  return (dispatch, getState) => {
    let updates = {};

    updates['/notification/' + UserKey + '/' + Key + '/delete'] = true;

    firebase.database().ref().update(updates, callback);
  };
}

export function loadNotification() {
  return (dispatch, getState) => {
    console.log("loading notifications");
    let UserKey = getState().auth.currentUserUID;
    let ref = firebase.database().ref('/notification/' + UserKey);
    ref.on('value', (snapshot) => {
      dispatch(loadNotificationList(snapshot.val()));
    });
  };
}

export function loadNotificationList(notifications) {
  return {
    type: types.NOTIFICATION_LOAD_SUCCESS, data: notifications
  };
}

