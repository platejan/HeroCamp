import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';
import toastr from 'toastr';
import {addStory} from '../../../actions/StoriesActions';


class StoryToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      story: {
        name: "",
        owner: this.props.ownerID
      },
      me: this.props.ownerID,
      showForm: false
    };

    this.onchange = this.onchange.bind(this);
    this.toggleCreateForm = this.toggleCreateForm.bind(this);
    this.createStory = this.createStory.bind(this);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state.story[field] = event.target.value;
    return this.setState(state);
  }

  toggleCreateForm() {
    let state = this.state;
    if (state.showForm) {
      state.showForm = false;
    } else {
      state.showForm = true;
    }
    return this.setState(state);
  }

  createStory(){
    if(this.state.story.name!=""){
      this.props.actions.addStory(this.state.story, (error = null)=> {
        if (error == null) {
          toastr.success("Story added", {timeOut: 250});
        } else {
          toastr.error(error);
        }
      });
    }else{
      toastr.error("Story must have a name.");
    }
  }

  render() {
    let createForm = "";
    if (this.state.showForm) {
      createForm = (<div className="">
        <div className="story-add-form-part col-xs-12">
          <div className="col-xs-12" style={{marginTop:"15px"}}>
            <div className="row" style={{paddingTop:"15px"}}>
              <div className="story-part-icon-part">
              </div>

              <div className="story-part-info">
                <form className="col-xs-12 col-sm-6">
                  <TextInput
                    name="name"
                    label="Name"
                    onChange={this.onchange}
                    value={this.state.story.name}
                  />
                  <button onClick={this.createStory} type="button" className="btn btn-success"><span className="glyphicon glyphicon-plus"></span>Create
                    story
                  </button>
                </form>
                <form className="col-xs-12 col-sm-6">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (
      <div className="row" style={{margin: '-7.5px',marginBottom: '7.5px'}}>
        <div className="">
          <div className="">
            <div className="stories-menu-right col-xs-12 col-sm-6 col-sm-push-6">
              <div className="btn-group">
                <button type="button" className="btn"><span className="glyphicon glyphicon-user"></span>My stories
                </button>
                <button type="button" className="btn"><span className="glyphicon glyphicon-heart"></span>Favourite
                  stories
                </button>
              </div>
            </div>
            <div className="stories-menu-left col-xs-12 col-sm-6 col-sm-pull-6">
              <button onClick={this.toggleCreateForm} type="button" className="btn btn-primary"><span className="glyphicon glyphicon-plus"></span>Create
                story
              </button>
            </div>
          </div>
        </div>
        {createForm}
      </div>
    );
  }
}

StoryToolbar.propTypes = {
  ownerID: PropTypes.string.isRequired
};

StoryToolbar.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    ownerID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({addStory}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryToolbar);
