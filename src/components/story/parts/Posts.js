import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadPosts, deletePost} from '../../../actions/PostsActions';
import Post from './Post';
import CreatePost from './CreatePost';
import CurrentHero from './CurrentHero';

class Posts extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillMount() {
    if (!this.props.chapterContent.posts) {
      this.props.onMount(this.props.chapterKey);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.chapterContent.posts) {
      this.props.onMount(nextProps.chapterKey);
    }
  }

  componentWillUnmount() {
  }

  deletePost(key) {
    this.props.actions.deletePost(this.props.chapterKey, key);
  }

  render() {
    const data = this.props.chapterContent.posts;
    let dataArray = [];
    let listPosts = "";
    if (data) {
      Object.keys(data).forEach(function (key, index) {
        dataArray.unshift({ItemKey: key, ItemContent: data[key]});
      });
      if (dataArray.length > 0) {
        listPosts = dataArray.map((post, index) => {

          const itemKey = post.ItemKey;
          const itemContent = post.ItemContent;
          const itemIndex = index + itemKey;

          if (!itemContent.delete) {
            return (
              <Post deletePost={this.deletePost} storyOwner={this.props.storyOwner} key={itemIndex} itemKey={itemKey}
                    itemContent={itemContent}/>
            );
          }
        });
      }
    }
    return (
      <div className="">
        <div className="row">
          <div className="col-xs-12">
            <div style={{position:"absolute",zIndex:"3"}}>
              <CurrentHero showSwitch={this.props.showSwitch}/>
            </div>
            <div className="row" style={{paddingLeft:"75px"}}>
              <CreatePost chapterName={this.props.chapterContent.name} storyName={this.props.storyName}
                          chapterKey={this.props.chapterKey} inventories={this.props.inventories}
                          storyKey={this.props.storyKey} storyOwner={this.props.storyOwner}/>
            </div>
          </div>
        </div>
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
      dispatch(loadPosts(chapterKey));
    },
    actions: bindActionCreators({deletePost}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
