import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateStory} from '../../../actions/StoriesActions';
import StoryEdit from './StoryEdit';
import Icon from '../../common/Icon';
import toastr from 'toastr';

class Story extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      story: {
        public: {
          icon: this.props.itemContent.public.icon,
          name: this.props.itemContent.public.name,
          age: this.props.itemContent.public.age,
          species: this.props.itemContent.public.species,
          biography: this.props.itemContent.public.biography,
          behavior: this.props.itemContent.public.behavior,
          inventory: this.props.itemContent.public.inventory
        },
        private: {
          icon: this.props.itemContent.public.icon,
          name: this.props.itemContent.private.name,
          age: this.props.itemContent.private.age,
          species: this.props.itemContent.private.species,
          biography: this.props.itemContent.private.biography,
          behavior: this.props.itemContent.private.behavior,
          inventory: this.props.itemContent.private.inventory
        },
        hasChange: this.props.itemContent.hasChange,
        owner: this.props.ownerID,
        inGame: this.props.itemContent.inGame
      },
      storyKey: this.props.itemKey,
      editWindowState: false,
      saveTimeout: null
    };

    this.showEditWindow = this.showEditWindow.bind(this);
    this.hideEditWindow = this.hideEditWindow.bind(this);
    this.ESCkey = this.ESCkey.bind(this);
    this.onchange = this.onchange.bind(this);
    this.updateStory = this.updateStory.bind(this);
    this.publishChanges = this.publishChanges.bind(this);
    this.rejectChanges = this.rejectChanges.bind(this);
    this.iconchange = this.iconchange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.ESCkey, false);
  }

  showEditWindow() {
    let newState = this.state;
    newState.editWindowState = true;
    this.setState(newState);
  }

  hideEditWindow() {
    if (this.state.editWindowState) {
      let newState = this.state;
      newState.editWindowState = false;
      this.setState(newState);
    }
  }

  ESCkey(event) {
    let keyCode = event.keyCode;
    if (keyCode === 27)
      this.hideEditWindow();
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state.story.private[field] = event.target.value;
    state.story.hasChange = true;
    clearTimeout(this.state.saveTimeout);
    state.saveTimeout = setTimeout(this.updateStory, 1000);
    return this.setState(state);
  }

  updateStory(ok = "saved", error = "Cannot update your Story") {
    clearTimeout(this.state.saveTimeout);
    this.props.actions.updateStory(this.state.story, this.state.storyKey, (error = null)=> {
      if (error == null) {
        toastr.success(ok, "", {timeOut: 250});
      } else {
        toastr.error(error);
      }
    });
  }

  publishChanges() {
    let state = this.state;
    state.story.public = JSON.parse(JSON.stringify(state.story.private));
    state.story.hasChange = false;
    this.setState(state);
    this.updateStory();
  }

  rejectChanges() {
    let state = this.state;
    state.story.private = JSON.parse(JSON.stringify(state.story.public));
    state.story.hasChange = false;
    this.setState(state);
    this.updateStory();
  }

  iconchange(event) {
    const field = event.target.name;
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      let state = this.state;
      state.story.private.icon = reader.result;
      state.story.hasChange = true;
      clearTimeout(this.state.saveTimeout);
      this.setState(state);
    }.bind(this), false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    let editButtonStyle = {};
    if (this.state.story.hasChange) {
      editButtonStyle = {
        color: 'red'
      };
    }
    let inGame = "";
    if (this.state.story.inGame) {
      inGame = (<div className="hero-bio-flag-part"><span>in game</span></div>);
    }

    return (
      <div className="hero-part col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="col-xs-12">
          <Icon icon={this.state.story.public.icon}/>
          <div className="hero-bio-part">
            <span className="info-label">Name:</span>
            <span className="">{this.state.story.public.name}</span>
          </div>
          {inGame}
          <div className="hero-bio-tools-part">
            <span onClick={this.showEditWindow} className="glyphicon glyphicon-pencil" style={editButtonStyle}></span>
          </div>
          <HeroEdit iconchange={this.iconchange} reject={this.rejectChanges} publish={this.publishChanges}
                    click={this.hideEditWindow}
                    onchange={this.onchange} story={this.state.story} display={this.state.editWindowState}/>

        </div>

      </div>
    );
  }
}

Story.propTypes = {
  itemContent: PropTypes.object.isRequired,
  itemKey: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
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
    actions: bindActionCreators({updateStory}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
