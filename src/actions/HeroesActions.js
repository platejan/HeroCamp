import firebase from 'firebase';
import * as types from './actionTypes';

export function updateHero(character, characterKey, callback){
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/heroes/'+owner+'/'+ characterKey] = character;
    firebase.database().ref().update(updates, callback);
  };

}
export function addHero(character, callback) {
  // Get a key for a new Post.
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let newHeroKey = firebase.database().ref().child('heroes').child(owner).push().key;
    dispatch(updateHero(character,newHeroKey,callback));
  };
}

export function heroesLoadStart() {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let ref = firebase.database().ref('/heroes/' + owner);
    ref.on('value', (snapshot) => {
      dispatch(heroesLoadList(snapshot.val()));
    });
  };
}

export function heroesLoadList(heroes) {
  return {
    type: types.HEROES_LOAD_SUCCESS, heroes
  };
}
