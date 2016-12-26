import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../requireAuth';
import ChapterToolbar from './parts/ChapterToolbar';
import ChapterDetail from './parts/ChapterDetail';
import Recruit from './parts/Recruit';
import AcceptRecruit from './parts/AcceptRecruit';
import StoryHeroes from './parts/StoryHeroes';
import SwitchHero from './parts/SwitchHero';
import CurrentHero from './parts/CurrentHero';
import {loadChapters, switchChapter, clearChapters} from '../../actions/ChaptersActions';
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

  componentWillMount() {
    this.props.beforeMount(this.state.story.id);
  }

  componentDidMount() {
    this.props.actions.getStoryOwner(this.state.story.id, this.setOwner);
  }

  setOwner(owner) {
    let state = this.state;
    state.story.owner = owner;
    return this.setState(state);
  }

  render() {
    if (this.state.story.id) {
      let acceptRecruit = "";
      if(this.state.story.owner==this.props.currentUID){
        acceptRecruit=(<AcceptRecruit storyKey={this.state.story.id}/>);
      }
      return (
        <div>
          <div className="col-xs-12 col-sm-4 col-lg-3">
            <CurrentHero/>
          <ChapterToolbar chapters={this.props.chapters} storyOwner={this.state.story.owner}
                          storyKey={this.state.story.id} switch={this.switchChapter}/>

            </div>
          <div className="col-xs-12 col-sm-8 col-lg-9">
            <SwitchHero storyKey={this.state.story.id} />
            <Recruit storyKey={this.state.story.id}/>
            {acceptRecruit}
            <StoryHeroes storyKey={this.state.story.id} storyOwner={this.state.story.owner} />
            <ChapterDetail chapters={this.props.chapters}/>
          </div>
        </div>
      )
    }
  }
}
StoryPage.propTypes = {};

StoryPage.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    chapters: state.chapters.all,
    currentUID: state.auth.currentUserUID
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
