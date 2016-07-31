import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import HeroList from './HeroList';
import * as HeroesActions from '../../../actions/HeroesActions';

const mapStateToProps = (state) => {
  return {
    heroes: state.heroes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(HeroesActions.heroesLoadStart());
    }
  };
};

class HeroListGenerator extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const data = this.props.heroes;

    return (
      <HeroList data={data}/>
    );
  }
}

HeroListGenerator.propTypes = {
  heroes: PropTypes.objectOf(PropTypes.object.isRequired).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroListGenerator);
