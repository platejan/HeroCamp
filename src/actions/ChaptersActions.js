import firebase from 'firebase';
import * as types from './actionTypes';

export function chaptersLoadStart() {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/chapters/firstStory');
    ref.on('value', (snapshot) => {
      dispatch(chaptersLoadList(snapshot.val()));
    });
  };
}

export function chaptersLoadList(chapters) {
  return {
    type: types.CHAPTERS_LOAD_SUCCESS, chapters
  };
}
