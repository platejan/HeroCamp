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
export function updateHeroPublicRules(rules, characterKey,userKey, callback) {
  return (dispatch, getState) => {
    console.log('/heroes/' + userKey + '/' + characterKey+'/public/rules/');
    console.log(rules);
    let updates = {};
    updates['/heroes/' + userKey + '/' + characterKey+'/public/rules/'] = rules;
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
export function deleteHero(characterKey,callback){
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/heroes/' + owner + '/' + characterKey+'/delete'] = true;
    firebase.database().ref().update(updates, callback);
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

export function recruitHero(heroKey, storyKey) {
  return (dispatch, getState) => {
    let owner = getState().auth.currentUserUID;
    let updates = {};
    updates['/heroes/' + owner + '/' + heroKey + '/inGame'] = storyKey;
    updates['/crossTables/recruit/' + storyKey + '/' + heroKey] = owner;
    firebase.database().ref().update(updates);
  };
}

export function acceptRecruitHero(heroKey, heroOwnerKey, storyKey) {
  return (dispatch, getState) => {
    let updates = {};
    firebase.database().ref('/crossTables/recruit/' + storyKey + '/' + heroKey).remove();
    updates['/crossTables/acceptedRecruit/' + storyKey + '/' + heroKey] = heroOwnerKey;
    firebase.database().ref().update(updates);
  };
}
export function rejectRecruitHero(heroKey, heroOwnerKey, storyKey) {
  return (dispatch, getState) => {
    let updates = {};
    firebase.database().ref('/crossTables/recruit/' + storyKey + '/' + heroKey).remove();
    updates['/heroes/' + heroOwnerKey + '/' + heroKey + '/inGame'] = false;
    firebase.database().ref().update(updates);
  };
}

export function fireHero(heroKey, heroOwnerKey, storyKey) {
  return (dispatch, getState) => {
    let updates = {};
    firebase.database().ref('/crossTables/acceptedRecruit/' + storyKey + '/' + heroKey).remove();
    updates['/heroes/' + heroOwnerKey + '/' + heroKey + '/inGame'] = false;
    firebase.database().ref().update(updates);
  };
}
export function LoadPotentialRecruits(storyKey) {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/crossTables/recruit/' + storyKey);
    ref.on('value', (snapshot) => {
      let data = snapshot.val();
      dispatch(PotentialRecruitClear());
      if (data) {
        Object.keys(data).forEach(function (key, index) {
          if (data && data[key])
            dispatch(LoadHeroPublic(data[key], key, "recruit"));
        });
      }
    });
  };
}
export function LoadStoryHeroes(storyKey) {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/crossTables/acceptedRecruit/' + storyKey);
    ref.on('value', (snapshot) => {
      let data = snapshot.val();
      dispatch(StoryHeroesClear());
      if (data) {
        Object.keys(data).forEach(function (key, index) {
          if (data && data[key])
            dispatch(LoadHeroPublic(data[key], key, "hero"));
        });
      }
    });
  };
}
export function LoadHeroPublic(userKey, heroKey, type) {
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/heroes/' + userKey + '/' + heroKey + '/public');
    ref.on('value', (snapshot) => {
      let hero = {};
      hero.owner = userKey;
      hero.public = snapshot.val();
      if(type=="hero")
        hero.inGame = true;
      else
        hero.inGame = false;
      if (type == "hero")
        dispatch(HeroLoaded(hero, heroKey));
      else
        dispatch(PotentialRecruitLoaded(hero, heroKey));
    });
  };
}

export function PotentialRecruitLoaded(obj, heroKey) {
  return {
    type: types.CURRENT_STORY_POTENTIAL_RECRUIT_LOAD, data: obj, key: heroKey
  };
}
export function HeroLoaded(obj, heroKey) {
  return {
    type: types.CURRENT_STORY_HERO_LOAD, data: obj, key: heroKey
  };
}
export function PotentialRecruitClear() {
  return {
    type: types.CURRENT_STORY_POTENTIAL_RECRUIT_CLEAR
  };
}
export function StoryHeroesClear() {
  return {
    type: types.CURRENT_STORY_HEROES_CLEAR
  };
}
export function setHero(heroKey) {
  return {
    type: types.CURRENT_STORY_SET_HERO, key: heroKey
  };
}
