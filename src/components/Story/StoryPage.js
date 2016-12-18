import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../requireAuth';
import ChapterToolbar from './parts/ChapterToolbar';
import ChapterDetail from './parts/ChapterDetail';
import {loadChapters,switchChapter,clearChapters} from '../../actions/ChaptersActions';
import {getStoryOwner} from '../../actions/StoriesActions';

class StoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      story: {
        id: props.params.storyId
      }
    };

    this.setOwner = this.setOwner.bind(this);
  }

  componentWillMount(){
    this.props.beforeMount(this.state.story.id);
  }

  componentDidMount(){
    this.props.actions.getStoryOwner(this.state.story.id,this.setOwner);
  }

  setOwner(owner){
    let state = this.state;
    state.story.owner = owner;
    return this.setState(state);
  }

  render() {
    console.log(this.state);
    if (this.state.story.id) {
      return (
        <div>
          <ChapterToolbar chapters={this.props.chapters} storyOwner={this.state.story.owner} storyKey={this.state.story.id} switch={this.switchChapter}/>
          <ChapterDetail/>
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
    chapters: state.chapters.all
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beforeMount: (storyKey) => {
      dispatch(clearChapters());
      dispatch(loadChapters(storyKey));
    },
    actions: bindActionCreators({getStoryOwner}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);
