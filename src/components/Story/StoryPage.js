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
import {loadChapters, switchChapter, clearChapters} from '../../actions/ChaptersActions';
import {getStoryOwner,CurrentStoryClear} from '../../actions/StoriesActions';
import {LoadStoryHeroes} from '../../actions/HeroesActions';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

class StoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      story: {
        id: props.params.storyId
      },
      showSwitchHero: false
    };

    this.setOwner = this.setOwner.bind(this);
    this.toggleSwitchHero = this.toggleSwitchHero.bind(this);
  }

  componentWillMount() {
    this.props.beforeMount(this.state.story.id);
  }

  componentDidMount() {
    this.props.actions.getStoryOwner(this.state.story.id, this.setOwner);
  }

  toggleSwitchHero(){
    console.log("toggle!");
    this.setState(Object.assign({},this.state,{showSwitchHero:!this.state.showSwitchHero}));
  }

  setOwner(owner) {
    let state = this.state;
    state.story.owner = owner;
    return this.setState(state);
  }

  render() {
    if (this.state.story.id) {
      let acceptRecruit = false;
      if (this.state.story.owner == this.props.currentUID) {
        acceptRecruit = (<AcceptRecruit storyKey={this.state.story.id}/>);
      }

      let storyName = this.props.stories[this.state.story.id]?this.props.stories[this.state.story.id].name:"";
      return (
        <div>
          <div className="col-xs-12 col-sm-4 col-lg-3">
            <ChapterToolbar chapters={this.props.chapters} storyOwner={this.state.story.owner}
                            storyKey={this.state.story.id} switch={this.switchChapter}/>

          </div>
          <div className="col-xs-12 col-sm-8 col-lg-9">
            <Tabs>
              <TabList>
                <Tab>Chapter Detail</Tab>
                <Tab>Recruit</Tab>
                <Tab>Story heroes</Tab>
              </TabList>
              <TabPanel>
                <SwitchHero closeSwitch={this.toggleSwitchHero} show={this.state.showSwitchHero} storyKey={this.state.story.id}/>
                <ChapterDetail showSwitch={this.toggleSwitchHero} storyName={storyName} chapters={this.props.chapters} storyOwner={this.state.story.owner}/>
              </TabPanel>
              <TabPanel>
                <Recruit storyKey={this.state.story.id}/>
              </TabPanel>
              <TabPanel>
                {acceptRecruit? acceptRecruit:""}
                <StoryHeroes storyKey={this.state.story.id} storyOwner={this.state.story.owner}/>
              </TabPanel>

            </Tabs>
          </div>
        </div>
      )
    }else {
      return (<div>No story id</div>);
    }
  }
}
StoryPage.propTypes = {};

StoryPage.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    chapters: state.chapters.all,
    currentUID: state.auth.currentUserUID,
    stories: state.stories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beforeMount: (storyKey) => {
      dispatch(clearChapters());
      dispatch(CurrentStoryClear());
      dispatch(loadChapters(storyKey));
      dispatch(LoadStoryHeroes(storyKey));
    },
    actions: bindActionCreators({getStoryOwner}, dispatch)

  };
}

export default checkAuth(connect(mapStateToProps, mapDispatchToProps)(StoryPage));
