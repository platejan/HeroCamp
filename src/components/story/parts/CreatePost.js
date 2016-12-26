import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {createPost} from '../../../actions/PostsActions';
import TextareaInput from '../../common/TextareaInput';


class CreatePost extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: ""
    };
    this.createPost = this.createPost.bind(this);
    this.onchange = this.onchange.bind(this);
  }


  createPost(){
    console.log("sending post");
    console.log(this.state);
    this.props.actions.createPost(this.state,this.props.currentHero,this.props.chapterKey, (error = null)=> {
      if (error == null) {
        toastr.success("sent");
      } else {
        toastr.error(error);
      }
    });
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state[field] = event.target.value;
    console.log(event.target.value);
    return this.setState(state);
  }

  render() {
    let hero= this.props.currentHero;
    if(hero) {
      if (this.props.heroes[this.props.currentHero])
        hero = this.props.heroes[this.props.currentHero].public.name;

      return (
        <div className="col-xs-12">
          <h1>Create post</h1>
          <form>
            <div className="form-group">
              <TextareaInput
                className="form-control"
                name="text"
                label="text"
                onChange={this.onchange}
                value={this.state.text}
              />
            </div>
          </form>
          <button onClick={this.createPost} className="btn btn-success">Send post as {hero}</button>
        </div>
      );
    }else return(null);
  }
}

CreatePost.propTypes = {
  userID: PropTypes.string.isRequired
};

CreatePost.contextTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    currentHero: state.currentStory.selectedHero,
    heroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createPost}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
