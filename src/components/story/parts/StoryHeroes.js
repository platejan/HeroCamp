import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import * as HeroesActions from '../../../actions/HeroesActions';
import {fireHero} from '../../../actions/HeroesActions';
import {CurrentStoryClear} from '../../../actions/StoriesActions';
import Hero from '../../../components/heroes/parts/Hero';


class StoryHeroes extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.fireHero = this.fireHero.bind(this);
  }

  componentWillMount() {
    if (Object.keys(this.props.storyHeroes).length < 1)
      this.props.onMount(this.props.storyKey);
  }

  componentWillUnmount() {
    this.props.actions.CurrentStoryClear();
  }

  fireHero(heroKey) {
    this.props.actions.fireHero(heroKey, this.props.storyHeroes[heroKey].owner, this.props.storyKey, (error = null)=> {
      if (error == null) {
        toastr.success("ok");
      } else {
        toastr.error(error);
      }
    });
  }

  render() {
    const data = this.props.storyHeroes;
    let dataArray = [];
    Object.keys(data).forEach(function (key, index) {
      dataArray.push({ItemKey: key, ItemContent: data[key]});
    });
    let listHeores = "";
    if (dataArray.length > 0) {
      listHeores = dataArray.map((hero, index) => {

        const itemKey = hero.ItemKey;
        const itemContent = hero.ItemContent;
        const itemIndex = index + itemKey;

        if (itemContent.inGame)
          if (this.props.storyOwner == this.props.userID)
            return (
              <Hero key={itemIndex} itemKey={itemKey} fire={this.fireHero.bind(this,itemKey)}
                    itemContent={itemContent} itemSize="col-sm-6 col-lg-4"/>
            );
          else
            return (
              <Hero key={itemIndex} itemKey={itemKey} itemContent={itemContent} itemSize="col-sm-6 col-lg-4"/>
            );
      });
    }
    return (
      <div className="col-xs-12">
        <h1>Heroes in story</h1>
        {listHeores}
      </div>
    );
  }
}

StoryHeroes.propTypes = {
  userID: PropTypes.string.isRequired
};

StoryHeroes.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    storyHeroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (storyKey) => {
      dispatch(HeroesActions.LoadStoryHeroes(storyKey));
    },
    actions: bindActionCreators({fireHero, CurrentStoryClear}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryHeroes);
