import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function updateStory(story, storyKey, callback){
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/stories/'+storyKey] = story;
    firebase.database().ref().update(updates, callback);
  };
}
export function addStory(story, callback) {
  // Get a key for a new Post.
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    story.owner = owner;
    let newStoryKey = firebase.database().ref().child('stories').push().key;
    dispatch(updateStory(story,newStoryKey,callback));
    dispatch(push('/stories/'+newStoryKey));
  };
}

export function storiesLoadStart() {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let ref = firebase.database().ref('/stories');
    ref.on('value', (snapshot) => {
      dispatch(storiesLoadList(snapshot.val()));
    });
  };
}

export function storiesLoadList(stories) {
  return {
    type: types.STORIES_LOAD_SUCCESS, stories
  };
}
