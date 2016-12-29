import firebase from 'firebase';
import * as types from './actionTypes';
import {push} from 'react-router-redux';

export function createPost(newPost,Hero,chapterKey,callback){
  // Get a key for a new Post.
  return (dispatch, getState) => {
    newPost.autorOwner = getState().auth.currentUserUID;
    newPost.autor=Hero;
    let newPostKey = firebase.database().ref().child('posts').child(chapterKey).push().key;
    dispatch(updatePost(chapterKey, newPost,newPostKey,callback));
  };
}

export function updatePost(chapterKey, newPost,newPostKey, callback){
  return (dispatch, getState) => {
    let updates = {};
    updates['/posts/'+chapterKey+'/'+newPostKey] = newPost;
    firebase.database().ref().update(updates, callback);
  };
}
export function loadPosts(chapterKey) {
  console.log("loading posts"+chapterKey);
  return (dispatch, getState) => {
    let ref = firebase.database().ref('/posts/'+chapterKey+'/');
    ref.on('value', (snapshot) => {
      dispatch(postsLoadList(snapshot.val(),chapterKey));
    });
  };
}

export function postsLoadList(posts, chapterKey) {
  console.log("posts loaded: ");
  console.log(posts);
  return {
    type: types.POSTS_LOAD_LIST, posts: posts, chapterKey: chapterKey
  };
}


