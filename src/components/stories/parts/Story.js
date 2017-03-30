import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {LinkContainer} from 'react-router-bootstrap';
import {deleteStory} from '../../../actions/StoriesActions';
import toastr from 'toastr';

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

    this.deleteStory = this.deleteStory.bind(this);
  }

  deleteStory(){
    if (this.state.me == this.state.story.owner) {
      this.props.actions.deleteStory(this.state.storyKey, (error = null)=> {
        if (error == null) {
          toastr.success("deleted");
        } else {
          toastr.error(error);
        }
      });
    }
  }

  render() {
    let linkTo = "/stories/"+this.state.storyKey;

    let removeTool = "";
    if(this.state.me == this.state.story.owner){
      removeTool = (
        <button className="btn btn-danger col-xs-2" style={{marginLeft: "150px",marginTop: "10px"}} onClick={this.deleteStory}>
          <span className="glyphicon glyphicon-trash"></span>
        </button>);
    }
    return (
      <LinkContainer to={linkTo}>
        <div className="story-part col-xs-12 col-lg-6">
          <div className="">
            <div className="story-part-icon-part">
            </div>
            <div className="story-part-info">
              <span className="info-label">Name:</span>
              <span className="">{this.state.story.name}</span>
              <span className="info-label">Owner:</span>
              <span className="">{this.props.usernames[this.state.story.owner]?this.props.usernames[this.state.story.owner].name : this.state.story.owner}</span>
              {removeTool}
            </div>
          </div>
        </div>
      </LinkContainer>
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
    ownerID: state.auth.currentUserUID,
    usernames: state.usernames
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({deleteStory}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
