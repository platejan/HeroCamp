import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteStory, addFavouriteStories, removeFavouriteStories} from '../../../actions/StoriesActions';
import {redirectMe} from '../../../actions/redirectAction';
import toastr from 'toastr';
import DeleteButton from './../../common/DeleteButton';

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
    this.addToFavourite = this.addToFavourite.bind(this);
    this.removeFromFavourite = this.removeFromFavourite.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  addToFavourite(e) {
    e.stopPropagation();
    this.props.actions.addFavouriteStories(this.state.storyKey);
  }

  removeFromFavourite(e) {
    e.stopPropagation();
    this.props.actions.removeFavouriteStories(this.state.storyKey);
  }

  deleteStory(e) {
    e.stopPropagation();
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

  redirect() {
    this.props.actions.redirectMe("/stories/" + this.state.storyKey);
  }

  render() {

    let removeTool = "";
    if (this.state.me == this.state.story.owner) {
      removeTool = <DeleteButton glyphicon={"trash"} className={"btn btn-danger"} click={this.deleteStory}/>
    }
    let favouriteStory = (
      <button className={this.props.favourite?"btn btn-success":"btn"}
              onClick={!this.props.favourite?this.addToFavourite:this.removeFromFavourite}>
        <span
          className={this.props.favourite?"glyphicon glyphicon-star noText":"glyphicon glyphicon-star-empty noText"}></span>
      </button>
    );
    return (
      <div onClick={this.redirect} className="story-part col-xs-12 col-lg-6">
        <div className="">
          <div className="story-part-icon-part">
          </div>
          <div className="story-part-info">
            <span className="info-label">Name:</span>
            <span className="">{this.state.story.name}</span>
            <span className="info-label">Owner:</span>
            <span
              className="">{this.props.usernames[this.state.story.owner] ? this.props.usernames[this.state.story.owner].name : this.state.story.owner}</span>
            <div className="col-xs-12 btn-group marginTop15"
                 style={{marginLeft:"130px"}}>{favouriteStory}{removeTool}</div>
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
    ownerID: state.auth.currentUserUID,
    usernames: state.usernames
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({deleteStory, addFavouriteStories, removeFavouriteStories, redirectMe}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
