import firebase from 'firebase';
import * as types from './actionTypes';

export function updateHero(character, characterKey, callback) {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/heroes/' + owner + '/' + characterKey] = character;
    firebase.database().ref().update(updates, callback);
  };

}
export function addHero(character, callback) {
  // Get a key for a new Post.
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let newHeroKey = firebase.database().ref().child('heroes').child(owner).push().key;
    dispatch(updateHero(character, newHeroKey, callback));
  };
}

export function heroesLoadStart() {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    console.log(owner);
    let ref = firebase.database().ref('/heroes/' + owner);
    ref.on('value', (snapshot) => {
      dispatch(heroesLoadList(snapshot.val()));
    });
  };
}

export function heroesLoadList(heroes) {
  console.log(heroes)
  return {
    type: types.HEROES_LOAD_SUCCESS, heroes
  };
}

export function recruitHero(heroKey, storyKey) {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/heroes/' + owner + '/' + heroKey + '/ingame'] = storyKey;
    updates['/crossTables/recruit/' + storyKey + '/' + heroKey] = owner;
    firebase.database().ref().update(updates);
  };
}

export function acceptRecruitHero(heroKey, heroOwnerKey, storyKey) {
  return (dispatch, getState) => {
    let updates = {};
    updates['/crossTables/acceptedRecruit/' + storyKey + '/' + heroKey] = heroOwnerKey;
    firebase.database().ref().update(updates);
  };
}

export function LoadPotentialRecruits(storyKey) {
  let ref = firebase.database().ref('/crossTables/recruit/' + storyKey);
  ref.on('value', (snapshot) => {
    console.log("loading recruits");
    //NEW CODE:
  });
}
