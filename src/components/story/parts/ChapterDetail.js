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
    if (this.props.chapter && Object.keys(this.props.chapters).length > 0 && this.props.chapters && this.props.chapters[this.props.chapter]) {

      let current = this.props.chapters[this.props.chapter];
      console.log(current);
      return (
        <div className="col-xs-12">
          <h1>Chapter: {current.name}</h1>
          <Posts inventories={current.inventories?current.inventories:{}}
                 storyOwner={this.props.storyOwner} showSwitch={this.props.showSwitch}
                 storyName={this.props.storyName} storyKey={this.props.storyKey} chapterKey={this.props.chapter}
                 chapterContent={this.props.chapters[this.props.chapter]}/>
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
