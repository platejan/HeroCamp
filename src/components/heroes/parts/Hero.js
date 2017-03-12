import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateHero, deleteHero} from '../../../actions/HeroesActions';
import {loadPublicRules} from '../../../actions/rulesActions';
import HeroEdit from './HeroEdit';
import HeroDetail from './HeroDetail';
import Icon from '../../common/Icon';
import toastr from 'toastr';

class Hero extends React.Component {
  constructor(props, context) {
    super(props, context);

    let itemContent = Object.assign({}, this.props.itemContent);

    let deleteProp = false;
    if (itemContent.delete)
      deleteProp = true;
    let publicRules = {};
    if (itemContent.public.rules)
      publicRules = itemContent.public.rules;
    let privateRules = {};
    if (itemContent.private && itemContent.private.rules)
      privateRules = itemContent.private.rules;


    let publicPrepare = Object.assign({}, itemContent.public, {rules: publicRules});
    this.state = {
      hero: {
        public: publicPrepare,
        private: {rules: {}},
        owner: this.props.ownerID,
        inGame: itemContent.inGame,
        delete: deleteProp
      },
      heroKey: this.props.itemKey,
      editWindowState: false,
      detailWindowState: false,
      saveTimeout: null,
      onlyPublic: true
    };
    if (itemContent.private !== undefined) {
      let privatePrepare = Object.assign({}, itemContent.private, {icon: itemContent.public.icon, rules: privateRules});
      this.state.hero.private = privatePrepare;
      this.state.hero.hasChange = itemContent.hasChange;
      this.state.onlyPublic = false;
    }

    this.showEditWindow = this.showEditWindow.bind(this);
    this.hideEditWindow = this.hideEditWindow.bind(this);
    this.showDetailWindow = this.showDetailWindow.bind(this);
    this.hideDetailWindow = this.hideDetailWindow.bind(this);
    this.ESCkey = this.ESCkey.bind(this);
    this.onchange = this.onchange.bind(this);
    this.updateHero = this.updateHero.bind(this);
    this.publishChanges = this.publishChanges.bind(this);
    this.rejectChanges = this.rejectChanges.bind(this);
    this.iconchange = this.iconchange.bind(this);
    this.deleteHero = this.deleteHero.bind(this);
    this.onchangeRules = this.onchangeRules.bind(this);
  }

  componentWillMount() {
    console.log(this.state);
    if (this.state.hero.public.rules.rulesSet) {
      if (!this.props.publicRules[this.state.hero.public.rules.rulesSet.value])
        this.props.actions.loadPublicRules(this.state.hero.public.rules.rulesSet.value);
    }
    if (this.props.itemContent.private !== undefined && this.state.hero.private.rules.rulesSet) {
      if (!this.props.publicRules[this.state.hero.private.rules.rulesSet.value])
        this.props.actions.loadPublicRules(this.state.hero.private.rules.rulesSet.value);
    }

  }

  componentDidUpdate() {
    if (this.state.heroKey != this.props.itemKey) {
      let newState = this.state;
      let deleteProp = false;
      if (this.props.itemContent.delete)
        deleteProp = true;

      newState.hero.public = this.props.itemContent.public;
      newState.hero.owner = this.props.itemContent.owner;
      newState.hero.inGame = this.props.itemContent.inGame;
      newState.hero.delete = deleteProp;
      newState.heroKey = this.props.itemKey;
      if (newState.hero.public.rules && newState.hero.public.rules.rulesSet.value)
        this.props.actions.loadPublicRules(newState.hero.public.rules.rulesSet.value);
      this.setState(newState);
    }
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

  showDetailWindow() {
    let newState = this.state;
    newState.detailWindowState = true;
    this.setState(newState);
  }

  hideDetailWindow() {
    if (this.state.detailWindowState) {
      let newState = this.state;
      newState.detailWindowState = false;
      this.setState(newState);
    }
  }

  ESCkey(event) {
    let keyCode = event.keyCode;
    if (keyCode === 27) {
      this.hideEditWindow();
      this.hideDetailWindow();
    }
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

  onchangeRules(key, value) {
    console.log("onchangeRules [key, value]: " + key + ", " + value);
    let state = this.state;
    if (!state.hero.private.rules)
      state.hero.private.rules = {};
    state.hero.private.rules[key] = value;
    state.hero.hasChange = true;
    clearTimeout(this.state.saveTimeout);
    state.saveTimeout = setTimeout(this.updateHero, 1000);
    console.log(this.state);
    if (key == "rulesSet")
      this.props.actions.loadPublicRules(value.value);
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

  deleteHero() {
    if (!this.state.hero.inGame) {
      this.props.actions.deleteHero(this.state.heroKey, (error = null)=> {
        if (error == null) {
          toastr.success("deleted");
        } else {
          toastr.error("can't delete hero");
        }
      });
    }
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
    let stop = function (e) {
      e.stopPropagation();
    };
    let editButtonStyle = {};
    if (this.state.hero.hasChange && !this.state.onlyPublic) {
      editButtonStyle = {
        color: 'red'
      };
    }
    let inGame = "";
    if (this.state.hero.inGame && this.props.showFlag) {
      inGame = (<div className="hero-bio-flag-part"><span>in game</span></div>);
    }

    let onClicAction = "";
    let style = {};
    if (this.props.onClicAction != undefined) {
      onClicAction = this.props.onClicAction;
      style = {cursor: "pointer"};
    }

    let editPart = "";
    let editTool = "";
    let removeTool = "";
    let detailPart = "";
    let detailTool = "";
    if (!this.state.onlyPublic) {
      let temp = Object.assign({},this.state.hero);
      editPart = (<HeroEdit iconchange={this.iconchange} reject={this.rejectChanges} publish={this.publishChanges}
                            click={this.hideEditWindow}
                            onchange={this.onchange} hero={temp} display={this.state.editWindowState}
                            onchangeRules={this.onchangeRules}/>);
      editTool = (
        <span onClick={this.showEditWindow} className="glyphicon glyphicon-pencil" style={editButtonStyle}></span>);
      if (!this.state.hero.inGame) {
        removeTool = (
          <span onClick={this.deleteHero} className="glyphicon glyphicon-trash"></span>);
      }
    } else {
      if (this.props.canViewDetail) {
        editPart = (
          <HeroDetail click={this.hideDetailWindow} hero={this.state.hero} display={this.state.detailWindowState}/>);
        detailTool = (<button onClick={this.showDetailWindow} className="btn btn-info btn-sm"><span
          className="glyphicon glyphicon-eye-open"></span></button>);
      }
    }


    let acceptButton = "";
    if (this.props.accept) {
      acceptButton = (<button onClick={this.props.accept} className="btn btn-success btn-sm">Accept</button>);
    }
    let rejectButton = "";
    if (this.props.reject) {
      rejectButton = (<button onClick={this.props.reject} className="btn btn-danger btn-sm">Reject</button>);
    }
    let fireButton = "";
    if (this.props.fire) {
      fireButton = (<button onClick={this.props.fire} className="btn btn-danger btn-sm">Fire</button>);
    }
    let heroPartSize = "hero-part col-xs-12";
    if (this.props.itemSize) {
      heroPartSize = heroPartSize + " " + this.props.itemSize;
    }
    return (
      <div onClick={onClicAction} style={style} className={heroPartSize}>
        <div className="col-xs-12">
          <Icon icon={this.state.hero.public.icon}/>
          <div className="hero-bio-part">
            <span className="info-label">Name:</span>
            <span className="">{this.state.hero.public.name}</span>
          </div>
          {inGame}
          <div onClick={stop} className="hero-bio-tools-part">
            {acceptButton}{rejectButton}{fireButton}{removeTool}{editTool}{detailTool}
          </div>
          {editPart}
          {detailPart}
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
    ownerID: state.auth.currentUserUID,
    publicRules: state.rules.publicRules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({updateHero, deleteHero, loadPublicRules}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
