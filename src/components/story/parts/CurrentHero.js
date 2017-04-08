import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import Hero from '../../../components/heroes/parts/Hero';


class CurrentHero extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
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
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentHero);
