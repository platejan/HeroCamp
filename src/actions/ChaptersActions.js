import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function addChapter(storyKey, chapter, callback) {
  // Get a key for a new Post.
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    chapter.owner = owner;
    let newChapterKey = firebase.database().ref().child('chapters').child(storyKey).push().key;
    dispatch(updateChapter(storyKey, chapter,newChapterKey,callback));
  };
}
export function updateChapter(storyKey, chapter, chapterKey, callback){
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/chapters/'+storyKey+'/'+chapterKey] = chapter;
    firebase.database().ref().update(updates, callback);
  };
}
export function deleteChapter(storyKey, chapterKey, callback){
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/chapters/'+storyKey+'/'+chapterKey+'/delete'] = true;
    firebase.database().ref().update(updates, callback);
  };
}
export function loadChapters(storyKey) {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/chapters/'+storyKey+'/');
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

export function switchChapter(chapterKey) {
  return {
    type: types.CHAPTER_SWITCH, chapterKey
  };
}
export function clearChapters() {
  return {
    type: types.CHAPTER_CLEAR_STATE
  };
}
