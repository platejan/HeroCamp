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

export function heroesLoadStart() {
  return (dispatch, getState) => {
    console.log("Loading from Firebase");
    let ref = firebase.database().ref('/heroes');
    ref.on('value', (snapshot) => {
      dispatch(heroesLoadList(snapshot.val()));
    });
  };
}

export function heroesLoadList(heroes) {
  console.log(heroes);
  return {
    type: types.HEROES_LOAD_SUCCESS, heroes
  };
}

