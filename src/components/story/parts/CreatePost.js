import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {createPost} from '../../../actions/PostsActions';
import TextareaInput from '../../common/TextareaInput';
import {createNotification} from '../../../actions/notificationActions';
import SimpleMDE  from 'react-simplemde-editor';

class CreatePost extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: ""
    };
    this.createPost = this.createPost.bind(this);
    this.onchange = this.onchange.bind(this);
  }


  createPost() {
    let date = new Date();
    let state = Object.assign({},this.state,{date: date.toJSON()});
    this.props.actions.createPost(state, this.props.currentHero, this.props.chapterKey, (error = null)=> {
      if (error == null) {
        toastr.success("sent");

        let heroes = this.props.heroes;
        let users = {};
        console.log("New post in " + this.props.chapterName + " inside " + this.props.storyName + ".");
        Object.keys(heroes).forEach(function (key) {
          users[key] = heroes[key].owner;
        });
        console.log(users);
        this.props.actions.createNotification(
          {text: "New post in " + this.props.chapterName + " inside " + this.props.storyName + "."},
          users
        );

        this.setState(Object.assign({},this.state,{text:""}));
      } else {
        toastr.error(error);
      }
    });
  }

  onchange(text) {
    let state = this.state;
    state.text = text;
    return this.setState(state);
  }

  render() {
    let hero = this.props.currentHero;
    if (hero) {
      if (this.props.heroes[this.props.currentHero])
        hero = this.props.heroes[this.props.currentHero].public.name;

      return (
        <div className="col-xs-12 CreatePostSimpleMDE">
          <SimpleMDE
            onChange={this.onchange}
            value={this.state.text}/>
          <button onClick={this.createPost} className="btn btn-success">Send post as {hero}</button>
        </div>
      );
    } else return (null);
  }
}

CreatePost.propTypes = {
  userID: PropTypes.string.isRequired
};

CreatePost.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    currentHero: state.currentStory.selectedHero,
    heroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createPost, createNotification}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
