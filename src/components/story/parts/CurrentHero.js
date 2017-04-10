import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import Hero from '../../../components/heroes/parts/Hero';
import {setHero} from '../../../actions/HeroesActions';

class CurrentHero extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  setHero(heroes, hero, userID) {
    if (hero == null && Object.keys(heroes).length > 0) {
      const data = heroes;
      let currentHero = null;
      let dataArray = [];
      Object.keys(data).forEach(function (key, index) {
        dataArray.push({ItemKey: key, ItemContent: data[key]});
      });
      if (dataArray.length > 0) {
        dataArray.forEach((hero, index) => {
          const itemKey = hero.ItemKey;

          if (hero.ItemContent.owner == userID) {
            currentHero = hero.ItemKey;
          }
        });

        if (currentHero != null)
          this.props.actions.setHero(currentHero);
      }
    }
  }

  componentWillMount() {
    this.setHero(this.props.heroes, this.props.hero, this.props.userID);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setHero(nextProps.heroes, nextProps.hero, nextProps.userID);
  }

  render() {
    let heroKey = this.props.hero;
    if (heroKey != null && this.props.heroes[heroKey])
      return (
        <Hero justIcon={true} iconSize={"200px"} onClicAction={this.props.showSwitch} itemKey={heroKey}
              itemContent={this.props.heroes[heroKey]} itemSize=""/>
      );
    else
      return (
        <div>
        </div>
      );
  }
}

CurrentHero.propTypes = {
  userID: PropTypes.string.isRequired
};

CurrentHero.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    heroes: state.currentStory.heroes,
    hero: state.currentStory.selectedHero
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({setHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentHero);
