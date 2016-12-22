import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateHero} from '../../../actions/HeroesActions';
import HeroEdit from './HeroEdit';
import Icon from '../../common/Icon';
import toastr from 'toastr';

class Hero extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hero: {
        public: {
          icon: this.props.itemContent.public.icon,
          name: this.props.itemContent.public.name,
          age: this.props.itemContent.public.age,
          species: this.props.itemContent.public.species,
          biography: this.props.itemContent.public.biography,
          behavior: this.props.itemContent.public.behavior,
          inventory: this.props.itemContent.public.inventory
        },
        private:{},
        owner: this.props.ownerID,
        inGame: this.props.itemContent.inGame
      },
      heroKey: this.props.itemKey,
      editWindowState: false,
      saveTimeout: null,
      onlyPublic : true
    };
    if(this.props.itemContent.private !== undefined){
      this.state.hero.private = {
        icon: this.props.itemContent.public.icon,
        name: this.props.itemContent.private.name,
        age: this.props.itemContent.private.age,
        species: this.props.itemContent.private.species,
        biography: this.props.itemContent.private.biography,
        behavior: this.props.itemContent.private.behavior,
        inventory: this.props.itemContent.private.inventory
      };
      this.state.hero.hasChange = this.props.itemContent.hasChange;
      this.state.onlyPublic = false;
    }

    this.showEditWindow = this.showEditWindow.bind(this);
    this.hideEditWindow = this.hideEditWindow.bind(this);
    this.ESCkey = this.ESCkey.bind(this);
    this.onchange = this.onchange.bind(this);
    this.updateHero = this.updateHero.bind(this);
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
    state.hero.private[field] = event.target.value;
    state.hero.hasChange = true;
    clearTimeout(this.state.saveTimeout);
    state.saveTimeout = setTimeout(this.updateHero, 1000);
    return this.setState(state);
  }

  updateHero(ok = "saved", error = "Cannot update your Hero") {
    clearTimeout(this.state.saveTimeout);
    this.props.actions.updateHero(this.state.hero, this.state.heroKey, (error = null)=> {
      if (error == null) {
        toastr.success(ok, "", {timeOut: 250});
      } else {
        toastr.error(error);
      }
    });
  }

  publishChanges() {
    let state = this.state;
    state.hero.public = JSON.parse(JSON.stringify(state.hero.private));
    state.hero.hasChange = false;
    this.setState(state);
    this.updateHero();
  }

  rejectChanges() {
    let state = this.state;
    state.hero.private = JSON.parse(JSON.stringify(state.hero.public));
    state.hero.hasChange = false;
    this.setState(state);
    this.updateHero();
  }

  iconchange(event) {
    const field = event.target.name;
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      let state = this.state;
      state.hero.private.icon = reader.result;
      state.hero.hasChange = true;
      clearTimeout(this.state.saveTimeout);
      this.setState(state);
    }.bind(this), false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    let editButtonStyle = {};
    if (this.state.hero.hasChange && !this.state.onlyPublic) {
      editButtonStyle = {
        color: 'red'
      };
    }
    let inGame = "";
    if (this.state.hero.ingame) {
      inGame = (<div className="hero-bio-flag-part"><span>in game</span></div>);
    }

    let onClicAction = "";
    let style= {};
    if(this.props.onClicAction != undefined){
      onClicAction = this.props.onClicAction;
      style = {cursor: "pointer"};
    }

    let editPart = "";
    let editTool = "";
    if(!this.state.onlyPublic){
      editPart = (<HeroEdit iconchange={this.iconchange} reject={this.rejectChanges} publish={this.publishChanges}
                            click={this.hideEditWindow}
                            onchange={this.onchange} hero={this.state.hero} display={this.state.editWindowState}/>);
      editTool =  (<span onClick={this.showEditWindow} className="glyphicon glyphicon-pencil" style={editButtonStyle}></span>);
    }
    return (
      <div onClick={onClicAction} style={style} className="hero-part col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="col-xs-12">
          <Icon icon={this.state.hero.public.icon}/>
          <div className="hero-bio-part">
            <span className="info-label">Name:</span>
            <span className="">{this.state.hero.public.name}</span>
          </div>
          {inGame}
          <div className="hero-bio-tools-part">
            {editTool}
          </div>
          {editPart}

        </div>

      </div>
    );
  }
}

Hero.propTypes = {
  itemContent: PropTypes.object.isRequired,
  itemKey: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  ownerID: PropTypes.string.isRequired
};

Hero.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    ownerID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({updateHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
