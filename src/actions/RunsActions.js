import firebase from 'firebase';
import * as types from './actionTypes';

export function runLoadStart() {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/runs');
    ref.on('value', (snapshot) => {
      dispatch(runsLoadList(snapshot.val()));
    });
  };
}

export function runsLoadList(runs) {
  //  runs = {one:{name: "RunA"},two:{name: "RunB"}};
  return {
    type: types.RUNS_LOAD_SUCCESS, runs
  };
}
