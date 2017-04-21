import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chaptersReducer(state = initialState.chapters, action) {
  let newChapters;
  let temp;
  let posts;
  switch (action.type) {
    case types.POSTS_LOAD_LIST:
      newChapters = Object.assign({}, initialState.chapters, {});
      newChapters.current = state.current;
      temp = Object.assign({}, initialState.chapters.all, state.all);
      posts = Object.assign({},action.posts,{"loaded":{type:"system"}}); 
      temp[action.chapterKey] = Object.assign({}, state.all[action.chapterKey], {['posts']: posts});
      newChapters.all = Object.assign({}, initialState.chapters.all, temp);
      return Object.assign({}, initialState.chapters, newChapters);
    case types.CHAPTERS_LOAD_SUCCESS:
      newChapters = Object.assign({}, initialState.chapters, {});
      newChapters.current = state.current;
      newChapters.all = action.chapters;
      temp = 0;
      if (newChapters.all)
        while (newChapters.current == null && temp < Object.keys(newChapters.all).length) {
          newChapters.current = Object.keys(newChapters.all)[temp];
          temp++;
        }
      return Object.assign({}, initialState.chapters, newChapters);
    case types.CHAPTER_SWITCH:
      newChapters = Object.assign({}, initialState.chapters, {});
      newChapters.all = state.all;
      newChapters.current = action.chapterKey;
      return Object.assign({}, initialState.chapters, newChapters);
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.chapters;
    case types.CHAPTER_CLEAR_STATE:
      return initialState.chapters;
    default:
      return state;
  }
}
