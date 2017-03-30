import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AdminPage from './components/admin/AdminPage';
import ProtectedPage from './components/protected/ProtectedPage';
import AboutPage from './components/about/AboutPage';
import LoginPage from './components/login/LoginPage'; //eslint-disable-line import/no-named-as-default
import RegistrationPage from './components/registration/RegistrationPage'; //eslint-disable-line import/no-named-as-default
import {requireAdmin} from './actions/authActions';

import StoriesPage from './components/stories/StoriesPage';
import HeroesPage from './components/heroes/HeroesPage';
import StoryPage from './components/story/StoryPage';
import RulesPage from './components/rules/RulesPage';
import MessagesPage from './components/messages/MessagesPage';


export default function Routes(store) {


  const checkAdmin = (nextState, replace, callback) => {
    store.dispatch(requireAdmin(nextState, replace, callback));
  };

  return (
    <Route name="HeroCamp" path="/" component={Layout}>
      <IndexRoute name="Dashboard" component={HomePage}/>
      <Route name="Layout" path="layout" component={Layout}/>
      <Route name="About" path="about" component={AboutPage}/>
      <Route name="Protected" path="protected" component={ProtectedPage}/>
      <Route name="Admin" path="admin" component={AdminPage} onEnter={checkAdmin}/>
      <Route name="Register" path="register" component={RegistrationPage}/>
      <Route name="Login" path="login" component={LoginPage}/>
      <Route name="Stories" path="stories" component={StoriesPage}>
        <Route name="Story" staticName={true} path=":storyId" component={StoryPage}/>
      </Route>

      <Route name="Heroes" path="heroes" component={HeroesPage}/>
      <Route name="Messages" path="messages" component={MessagesPage}/>
      <Route name="Rules Maker" path="rulespage" component={RulesPage}/>
    </Route>
  );
}
