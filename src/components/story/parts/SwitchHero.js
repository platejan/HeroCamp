import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import * as HeroesActions from '../../../actions/HeroesActions';
import {setHero} from '../../../actions/HeroesActions';
import {CurrentStoryClear} from '../../../actions/StoriesActions';
import Hero from '../../../components/heroes/parts/Hero';


class SwitchHero extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.setHero = this.setHero.bind(this);
  }

  componentWillMount() {
    if (Object.keys(this.props.heroes).length < 1)
      this.props.onMount(this.props.storyKey);

  }

  componentWillUnmount() {
  }

  setHero(heroKey) {
    this.props.actions.setHero(heroKey, (error = null)=> {
      if (error == null) {
        toastr.success("ok");
      } else {
        toastr.error(error);
      }
    });
  }

  render() {
    const data = this.props.heroes;
    let currentHero = null;
    let dataArray = [];
    Object.keys(data).forEach(function (key, index) {
      dataArray.push({ItemKey: key, ItemContent: data[key]});
    });
    let listHeores = "";
    if (dataArray.length > 0) {
      listHeores = dataArray.map((hero, index) => {

        const itemKey = hero.ItemKey;
        const itemContent = hero.ItemContent;
        const itemIndex = index+itemKey;

        if (itemContent.owner == this.props.userID) {
          currentHero = itemKey;
          return (
            <Hero key={itemIndex} itemKey={itemKey} onClicAction={this.setHero.bind(this,itemKey)}
                  itemContent={itemContent} itemSize="col-sm-6 col-lg-4"/>
          );
        }
        return;
      });
    }
    if(currentHero)
    this.props.actions.setHero(currentHero);
    return (
      <div className="col-xs-12">
        <h1>Switch Hero</h1>
        {listHeores}
      </div>
    );
  }
}

SwitchHero.propTypes = {
  userID: PropTypes.string.isRequired
};

SwitchHero.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    heroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (storyKey) => {
      dispatch(HeroesActions.LoadStoryHeroes(storyKey));
    },
    actions: bindActionCreators({setHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchHero);
