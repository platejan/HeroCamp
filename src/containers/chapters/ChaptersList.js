import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import ListOfChapters from '../../components/chapters/parts/ListOfChapters';
import * as ChaptersActions from '../../actions/ChaptersActions';

const mapStateToProps = (state) => {
  return {
    runs: state.runs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(ChaptersActions.chaptersLoadStart());
    }
  };
};

class ChaptersList extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const data = this.props.runs;

    return (
      <ListOfChapters data={data}/>
    );
  }
}

ChaptersList.propTypes = {
  runs: PropTypes.objectOf(PropTypes.object.isRequired).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChaptersList);