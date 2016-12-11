import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../requireAuth';
import ChapterToolbar from './parts/ChapterToolbar';
import {loadChapters} from '../../actions/ChaptersActions';

class StoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      story: {
        id: props.params.storyId
      },
      displayChapter: {
        key: null
      }
    };
    this.switchChapter = this.switchChapter.bind(this);
  }

  componentDidMount() {
    this.props.onMount(this.state.story.id);
  }

  switchChapter(chapterKey) {
    let state = this.state;
    state.displayChapter = {key: chapterKey};
    console.log("switch!");
    this.setState(state);
  }

  render() {
    console.log(this.state);
    if (this.state.story.id) {
      return (
        <div>
          <p>Story {this.state.story.id}</p>
          <ChapterToolbar chapters={this.props.chapters} storyKey={this.state.story.id} switch={this.switchChapter}/>
        </div>
      )
    }
  }
}
StoryPage.propTypes = {
};

StoryPage.contextTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    chapters: state.chapters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (storyKey) => {
      dispatch(loadChapters(storyKey));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);
