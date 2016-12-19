import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import TextInput from '../../common/TextInput';
import toastr from 'toastr';


class ChapterDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      posts: {}
    };
  }

  render() {
    console.log(this.props.chapter);
    return (
      <div className="col-xs-12">
        <h1>Key: {this.props.chapter}</h1>
      </div>
    );
  }
}

ChapterDetail.propTypes = {
  userID: PropTypes.string.isRequired
};

ChapterDetail.contextTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
      chapter: state.chapters.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetail);
