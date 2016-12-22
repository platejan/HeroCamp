import {combineReducers} from 'redux';
import user from './userReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';
import chapters from './chaptersReducer';
import heroes from './heroesReducer';
import stories from './storiesReducer';
import currentStory from './currentStoryReducer'

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  auth,
  ajaxCallsInProgress,
  chapters,
  stories,
  currentStory,
  heroes
});

export default rootReducer;
