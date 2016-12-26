import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import TextInput from '../../common/TextInput';
import toastr from 'toastr';
import Posts from './Posts';


class ChapterDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    console.log("chapter detail:");
    console.log(this.props.chapters);
    if (Object.keys(this.props.chapters).length > 0 && this.props.chapters && this.props.chapters[this.props.chapter]) {
      return (
        <div className="col-xs-12">
          <h1>Key: {this.props.chapters[this.props.chapter].name}</h1>
          <Posts chapterKey={this.props.chapter} chapterContent={this.props.chapters[this.props.chapter]}/>
        </div>
      );
    }else
      return (<div></div>);
  }
}

ChapterDetail.propTypes = {
  userID: PropTypes.string.isRequired
};

ChapterDetail.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    chapter: state.chapters.current
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterDetail);
