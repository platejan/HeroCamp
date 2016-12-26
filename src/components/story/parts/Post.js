import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Post extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    let style={
      backgroundColor:"#fafafa"
    };
    return (
      <div className="col-xs-12" style={style}>
        <h1>{this.props.heroes[this.props.itemContent.autor].public.name}</h1>
        <p>{this.props.itemContent.text}</p>
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
