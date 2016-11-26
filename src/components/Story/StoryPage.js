import React from 'react';
import checkAuth from '../requireAuth';


class StoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      story: {
        id: null
      }
    };
  }

  componentDidMount() {
    let state = this.state;
    state.story.id = this.props.params.storyId;
    return this.setState(state);
  }

  render() {
    console.log(this.state);
    if (this.state.story.id) {
      return (
        <p>Story {this.state.story.id}</p>
      )
    } else {
      return (
        <p>loading...</p>
      )
    }
  }
}

export default checkAuth(StoryPage);
