import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chaptersReducer(state = initialState.chapters, action) {
  let newChapters;
  let temp;
  switch (action.type) {
    case types.POSTS_LOAD_LIST:
      newChapters = Object.assign({}, initialState.chapters, {});
      newChapters.current = state.current;
      temp = Object.assign({}, initialState.chapters.all, state.all);
      temp[action.chapterKey] = Object.assign({}, state.all[action.chapterKey],{['posts']:action.posts});
      newChapters.all = Object.assign({}, initialState.chapters.all, temp);
      return Object.assign({}, initialState.chapters, newChapters);
    case types.CHAPTERS_LOAD_SUCCESS:
      newChapters = Object.assign({}, initialState.chapters, {});
      newChapters.current = state.current;
      newChapters.all = action.chapters;
      if (newChapters.current == null) {
        newChapters.current = Object.keys(newChapters.all)[0];
      }
      console.log(newChapters);
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
