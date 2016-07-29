import firebase from 'firebase';
import * as types from './actionTypes';

export function addHero(character,callback) {
  // Get a key for a new Post.
  let newHeroKey = firebase.database().ref().child('heroes').push().key;

  // Write the new heores's data simultaneously in the posts list and the user's post list.
  let updates = {};
  updates['/heroes/' + newHeroKey] = character;
  //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  firebase.database().ref().update(updates,callback);
}

function addHeroSuccess() {
  return {
    type: types.HERO_CREATE_SUCCESS
  }
}
function addHeroFail() {
  return {
    type: types.HERO_CREATE_FAIL
  }
}
