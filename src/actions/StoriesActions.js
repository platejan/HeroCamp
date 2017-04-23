import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function updateStory(story, storyKey, callback) {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/stories/' + storyKey] = story;
    firebase.database().ref().update(updates, callback);
  };
}

export function deleteStory(storyKey, callback) {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/stories/' + storyKey + '/delete'] = true;
    firebase.database().ref().update(updates, callback);
  };
}

export function addStory(story, callback) {
  // Get a key for a new Post.
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    story.owner = owner;
    let newStoryKey = firebase.database().ref().child('stories').push().key;
    dispatch(updateStory(story, newStoryKey, callback));
    dispatch(push('/stories/' + newStoryKey));
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

export function storyLoadStart(key) {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let ref = firebase.database().ref('/stories/' + key);
    ref.on('value', (snapshot) => {
      dispatch(storyLoaded(key, snapshot.val()));
    });
  };
}

export function storyLoaded(key, story) {
  return {
    type: types.STORY_LOAD_SUCCESS, data: story, key: key
  };
}


export function getStoryOwner(key, callback) {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/stories/' + key + '/owner');
    ref.on('value', (snapshot) => {
      callback(snapshot.val());
    });
  };
}

export function CurrentStoryClear() {
  return {
    type: types.CURRENT_STORY_CLEAR
  };
}

export function favouriteStoriesLoadStart() {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let ref = firebase.database().ref('/favouriteStories/' + owner);
    ref.on('value', (snapshot) => {
      dispatch(favouriteStoriesLoadList(snapshot.val()));
    });
  };
}

export function favouriteStoriesLoadList(data) {
  return {
    type: types.FAVOURITE_STORIES_LOAD_SUCCESS, data
  };
}


export function addFavouriteStories(storyKey) {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/favouriteStories/' + owner + '/' + storyKey] = storyKey;
    firebase.database().ref().update(updates);
  };
}

export function removeFavouriteStories(storyKey) {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    firebase.database().ref('/favouriteStories/' + owner + '/' + storyKey).remove();
  };
}
