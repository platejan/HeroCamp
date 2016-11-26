import React from 'react';
import StoriesList from '../../containers/stories/StoriesList';
import StoryAdd from './parts/StoryToolbar';
import Story from './../story/StoryPage';
import checkAuth from '../requireAuth';

class StoriesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    if (this.props.children) {
      return(
        <div>{this.props.children}</div>
      )
    } else {
      return (
        <StoriesList />
      );
    }
  }
}

export default checkAuth(StoriesPage);
