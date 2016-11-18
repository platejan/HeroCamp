import firebase from 'firebase';
import * as types from './actionTypes';

export function updateStory(character, characterKey, callback){
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/stories/'+owner+'/'+ characterKey] = character;
    firebase.database().ref().update(updates, callback);
  };

}
export function addStory(story, callback) {
  // Get a key for a new Post.
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let newStoryKey = firebase.database().ref().child('stories').child(owner).push().key;
    dispatch(updateStory(story,newStoryKey,callback));
  };
}

export function storiesLoadStart() {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    console.log(owner);
    let ref = firebase.database().ref('/stories/' + owner);
    ref.on('value', (snapshot) => {
      dispatch(storiesLoadList(snapshot.val()));
    });
  };
}

export function storiesLoadList(stories) {
  console.log(stories)
  return {
    type: types.STORIES_LOAD_SUCCESS, stories
  };
}
