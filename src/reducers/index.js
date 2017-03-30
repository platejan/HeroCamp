import {combineReducers} from 'redux';
import user from './userReducer';
import usernames from './usernamesReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';
import chapters from './chaptersReducer';
import heroes from './heroesReducer';
import rules from './rulesReducer';
import stories from './storiesReducer';
import currentStory from './currentStoryReducer';
import messages from './messagesReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  usernames,
  auth,
  ajaxCallsInProgress,
  chapters,
  stories,
  currentStory,
  heroes,
  rules,
  messages
});

export default rootReducer;
