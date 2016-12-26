import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PostsActions from '../../../actions/PostsActions';
import Post from './Post';
import CreatePost from './CreatePost';

class Posts extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  componentWillMount() {
    this.props.onMount(this.props.chapterKey);
  }

  componentWillUnmount() {
  }

  render() {
    console.log(this.props.chapterContent);
    const data = this.props.chapterContent.posts;
    let dataArray = [];
    let listPosts = "";
    if(data){
    Object.keys(data).forEach(function (key, index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      dataArray.push({ItemKey: key, ItemContent: data[key]});
    });
    if (dataArray.length > 0) {
      listPosts = dataArray.map((post, index) => {

        const itemKey = post.ItemKey;
        const itemContent = post.ItemContent;
        const itemIndex = index + itemKey;

        return (
          <Post key={itemIndex} itemKey={itemKey} itemContent={itemContent}/>
        );
      });
    }
    }
    return (
      <div className="col-xs-12">
        <CreatePost chapterKey={this.props.chapterKey}/>
        <h1>Posts</h1>
        {listPosts}
      </div>
    );
  }
}

Posts.propTypes = {
  userID: PropTypes.string.isRequired
};

Posts.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (chapterKey) => {
      dispatch(PostsActions.loadPosts(chapterKey));
    },
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);