import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactMarkdown from 'react-markdown';
import Hero from './../../heroes/parts/Hero'


class Post extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost(){
    console.log("delete me!"+this.props.itemKey);
    this.props.deletePost(this.props.itemKey);
  }

  render() {
    let deletePostButton = "";
    if(this.props.storyOwner == this.props.userID){
      deletePostButton = (<button onClick={this.deletePost} className="btn btn-xs btn-danger pull-right"><span className="glyphicon glyphicon-trash noText"></span></button>);
    }
    let name = "undefined";
    let hero = false;
    if (this.props.heroes[this.props.itemContent.autor]) {
      name = this.props.heroes[this.props.itemContent.autor].public.name;
      hero = this.props.heroes[this.props.itemContent.autor];
    }
    return (
      <div className="">
        <div style={{position:"absolute"}}>
        {hero ? (<Hero justIcon={true} iconSize={"150px"} itemKey={this.props.itemContent.autor}
                       itemContent={hero} itemSize=""/>) : ""}
          </div>
        <div style={{paddingLeft:"75px"}}>
          <div className=" panel panel-default" style={{minHeight:"150px"}}>
            <div className="panel-heading">{name} {this.props.itemContent.date? (<small className="text-muted">{"("+(new Date(this.props.itemContent.date)).toLocaleString()+")"}</small>): ""}{deletePostButton}</div>
            <div className="panel-body">
              <ReactMarkdown source={this.props.itemContent.text} softBreak="br"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  userID: PropTypes.string.isRequired
};

Post.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    heroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
