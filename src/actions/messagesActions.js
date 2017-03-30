import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function createMessage(Message, callback, type = "classic") {
  return (dispatch, getState) => {
    Message.sender = getState().auth.currentUserUID;
    if (type == "draft") {
      let MessageSenderKey = firebase.database().ref().child('messages').child(Message.sender).child('drafts').push().key;
      dispatch(updateMessage(Message, MessageSenderKey, "draft", callback));
    } else {
      let MessageRecipientKey = firebase.database().ref().child('messages').child(Message.recipient).child('inbox').push().key;
      let MessageSenderKey = firebase.database().ref().child('messages').child(Message.sender).child('outbox').push().key;
      dispatch(updateMessage(Message, MessageSenderKey, "sender", callback));
      dispatch(updateMessage(Message, MessageRecipientKey, "recipient", function () {
      }));
    }
  };
}

export function updateMessage(Message, Key, Type, callback) {
  return (dispatch, getState) => {
    let updates = {};

    if (Type == "draft")
      updates['/messages/' + Message.sender + '/drafts/' + Key] = Message;
    if (Type == "sender")
      updates['/messages/' + Message.sender + '/outbox/' + Key] = Message;
    if (Type == "recipient")
      updates['/messages/' + Message.recipient + '/inbox/' + Key] = Message;

    firebase.database().ref().update(updates, callback);
  };
}

export function deleteMessage(Key, UserKey, type, callback) {
  return (dispatch, getState) => {
    let updates = {};

    updates['/messages/' + UserKey + '/'+type+'/' + Key + '/delete'] = true;

    firebase.database().ref().update(updates, callback);
  };
}

export function loadMessages() {
  return (dispatch, getState) => {
    let UserKey = getState().auth.currentUserUID;
    let ref = firebase.database().ref('/messages/' + UserKey);
    ref.on('value', (snapshot) => {
      dispatch(loadMessagesList(snapshot.val()));
    });
  };
}

export function loadMessagesList(messages) {
  return {
    type: types.MESSAGES_LOAD_SUCCESS, data: messages
  };
}
