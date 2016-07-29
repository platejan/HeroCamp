import firebase from 'firebase';
import * as types from './actionTypes';

export function chaptersLoadStart() {
  return (dispatch, getState) => {
    console.log("Loading from Firebase");
    let ref = firebase.database().ref('/chapters/firstStory');
    ref.on('value', (snapshot) => {
      dispatch(chaptersLoadList(snapshot.val()));
    });
  };
}

export function chaptersLoadList(chapters) {
  console.log(chapters);
  //  chapters = {one:{name: "RunA"},two:{name: "RunB"}};
  return {
    type: types.CHAPTERS_LOAD_SUCCESS, chapters
  };
}
