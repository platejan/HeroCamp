import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Story extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      story: {
        name: this.props.itemContent.name,
        owner: this.props.itemContent.owner
      },
      storyKey: this.props.itemKey,
      me: this.props.ownerID
    };
  }

  render() {
    return (
      <div className="story-part col-xs-12 col-lg-6">
        <div className="">
          <div className="story-part-icon-part">
          </div>
          <div className="story-part-info">
            <span className="info-label">Name:</span>
            <span className="">{this.state.story.name}</span>
            <span className="info-label">Owner:</span>
            <span className="">{this.state.story.owner}</span>
          </div>
        </div>
      </div>
    );
  }
}

Story.propTypes = {
  itemContent: PropTypes.object.isRequired,
  itemKey: PropTypes.string.isRequired,
  ownerID: PropTypes.string.isRequired
};

Story.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    ownerID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
