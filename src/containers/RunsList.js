import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import ListOfRuns from '../components/listOfRuns/ListOfRuns';
import * as RunsActions from '../actions/RunsActions';

const mapStateToProps = (state) => {
  return {
    runs: state.runs
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(RunsActions.runLoadStart())
    }
  }
};

export class RunsList extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const data = this.props.runs;

    return (
      <ListOfRuns data={data}/>
    )
  }
}

RunsList.propTypes = {
  runs: PropTypes.objectOf(PropTypes.object.isRequired).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RunsList);
