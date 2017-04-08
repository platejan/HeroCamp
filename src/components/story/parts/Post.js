import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactMarkdown from 'react-markdown';


class Post extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    let name = "undefined";
    if(this.props.heroes[this.props.itemContent.autor]){
      name = this.props.heroes[this.props.itemContent.autor].public.name;
    }
    return (
        <div className=" panel panel-default">
          <div className="panel-heading">{name}</div>
          <div className="panel-body">
            <ReactMarkdown  source={this.props.itemContent.text} softBreak="br"/>
          </div>
        </div>
    );
  }
}

Post.propTypes = {
  userID: PropTypes.string.isRequired
};

Post.contextTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    heroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
