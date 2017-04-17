import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateHero, deleteHero,updateHeroPublicRules} from '../../../actions/HeroesActions';
import {loadPublicRules} from '../../../actions/rulesActions';
import HeroEdit from './HeroEdit';
import HeroDetail from './HeroDetail';
import Icon from '../../common/Icon';
import toastr from 'toastr';
import {Modal} from 'react-bootstrap';

class Hero extends React.Component {
  constructor(props, context) {
    super(props, context);

    let itemContent = Object.assign({}, this.props.itemContent);
    this.state = {
      hero: Object.assign({public: {rules: {}}, private: {rules: {}}}, itemContent ? itemContent : {}),
      heroKey: this.props.itemKey,
      saveTimeout: null,
      onlyPublic: itemContent.private ? false : true,
      showEdit: false,
      showDetail: false
    };
    let hero = {};

    hero.public = Object.assign({}, itemContent.public);
    hero.public.rules = Object.assign({}, itemContent.public.rules);
    if (itemContent.private) {
      hero.private = Object.assign({}, itemContent.private);
      hero.private.rules = Object.assign({}, itemContent.private.rules);
    }

    this.state.hero = Object.assign({}, this.state.hero, hero);

    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);

    this.onchange = this.onchange.bind(this);
    this.updateHero = this.updateHero.bind(this);
    this.publishChanges = this.publishChanges.bind(this);
    this.rejectChanges = this.rejectChanges.bind(this);
    this.iconchange = this.iconchange.bind(this);
    this.deleteHero = this.deleteHero.bind(this);
    this.onchangeRules = this.onchangeRules.bind(this);
    this.publishRulesChanges = this.publishRulesChanges.bind(this);
    this.onchangeRulesPublic = this.onchangeRulesPublic.bind(this);
  }

  componentWillMount() {
    let publicRulesSet = this.state.hero.public.rules.rulesSet ? this.state.hero.public.rules.rulesSet.value : false;
    let privateRulesSet = this.state.hero.private.rules.rulesSet ? this.state.hero.private.rules.rulesSet.value : false;
    if (publicRulesSet) {
      if (!this.props.publicRules[publicRulesSet])
        this.props.actions.loadPublicRules(publicRulesSet);
    }
    if (privateRulesSet) {
      if (!this.props.publicRules[privateRulesSet] && publicRulesSet != privateRulesSet)
        this.props.actions.loadPublicRules(privateRulesSet);
    }
  }

  componentWillReceiveProps(nextProps) {
    let itemContent = Object.assign({}, nextProps.itemContent);
    let state = {
      hero: Object.assign({public: {rules: {}}, private: {rules: {}}}, itemContent ? itemContent : {}),
      heroKey: nextProps.itemKey,
      saveTimeout: this.state.saveTimeout,
      onlyPublic: itemContent.private ? false : true,
      showEdit: this.state.showEdit,
      showDetail: this.state.showDetail
    };
    let hero = {};
    hero.public = Object.assign({}, itemContent.public);
    hero.public.rules = Object.assign({}, itemContent.public.rules);
    if (itemContent.private) {
      hero.private = Object.assign({}, itemContent.private);
      hero.private.rules = Object.assign({}, itemContent.private.rules);
    }
    state.hero = Object.assign({}, state.hero, hero);
    this.setState(state);
  }

  onchange(event) {
    let state = Object.assign({}, this.state);
    const field = event.target.name;
    state.hero.private[field] = event.target.value;
    state.hero.hasChange = true;
    clearTimeout(this.state.saveTimeout);
    state.saveTimeout = setTimeout(this.updateHero, 1000);
    return this.setState(state);
  }

  onchangeRules(key, value) {
    let state = Object.assign({}, this.state);
    state.hero.private['rules'][key] = value;
    state.hero.hasChangeRules = true;
    clearTimeout(this.state.saveTimeout);
    if (key != "rulesSet")
      state.saveTimeout = setTimeout(this.updateHero, 1000);
    this.setState(state);
    if (key == "rulesSet") {
      this.updateHero();
      this.props.actions.loadPublicRules(value.value);
    }
  }

  onchangeRulesPublic(key, value) {
    let state = Object.assign({}, this.state.hero.public.rules);
    let userKey = this.state.hero.owner;
    state[key] = value;
    this.props.actions.updateHeroPublicRules(state, this.state.heroKey,userKey ,(error = null)=> {
      if (error == null) {
        toastr.success("ok");
      } else {
        toastr.error(error);
      }
    });
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
    let publicRules = Object.assign({}, state.hero.public.rules);
    state.hero.public = Object.assign({}, state.hero.private);
    state.hero.public.rules = publicRules;
    state.hero.hasChange = false;
    this.setState(state);
    this.updateHero();
  }

  publishRulesChanges() {
    let state = this.state;
    let privateRules = Object.assign({}, state.hero.private.rules);
    state.hero.public.rules = privateRules;
    state.hero.hasChangeRules = false;
    this.setState(state);
    this.updateHero();
  }

  rejectChanges() {
    let state = this.state;
    state.hero.private = Object.assign({}, state.hero.public);
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

  toggleDetail() {
    this.setState(Object.assign(this.state, {showDetail: !this.state.showDetail}));
  }

  toggleEdit() {
    this.setState(Object.assign(this.state, {showEdit: !this.state.showEdit}));
  }

  render() {
    let stop = function (e) {
      e.stopPropagation();
    };

    let inGame = "";
    if (this.state.hero.inGame && this.props.showFlag) {
      inGame = (<div className="hero-bio-flag-part"><span>in game</span></div>);
    }

    let editPart = "";
    let editTool = "";
    let removeTool = "";
    let detailPart = "";
    let detailTool = "";
    if (!this.state.onlyPublic) {
      let temp = Object.assign({}, this.state.hero);
      editPart = (
        <Modal show={this.state.showEdit} onHide={this.toggleEdit}>
          <Modal.Header closeButton/>
          <Modal.Body style={{paddingTop:"0",paddingBottom:"0"}}>
            <HeroEdit iconchange={this.iconchange} reject={this.rejectChanges}
                      publish={this.publishChanges} publishRules={this.publishRulesChanges}
                      onchange={this.onchange} hero={temp}
                      onchangeRules={this.onchangeRules}/>
          </Modal.Body>
        </Modal>
      );
      editTool = (<span onClick={this.toggleEdit} className="glyphicon glyphicon-pencil"
                        style={this.state.hero.hasChange?{color:"red"}:{}}></span>);
      if (!this.state.hero.inGame) {
        removeTool = (<span onClick={this.deleteHero} className="glyphicon glyphicon-trash"></span>);
      }
    } else if (this.props.canViewDetail) {
      editPart = (
        <Modal show={this.state.showDetail} onHide={this.toggleDetail}>
          <Modal.Header closeButton/>
          <Modal.Body style={{paddingTop:"0",paddingBottom:"0"}}>
            <HeroDetail pj={this.props.pj?this.props.pj:false} onchangeRulesPublic={this.onchangeRulesPublic} hero={this.state.hero}/>
          </Modal.Body>
        </Modal>
      );
      detailTool = (<button onClick={this.toggleDetail} className="btn btn-info btn-sm"><span
        className="glyphicon glyphicon-eye-open noText"></span></button>);
    }

    let acceptButton = this.props.accept ? (
      <button onClick={this.props.accept} className="btn btn-success btn-sm">Accept</button>) : "";
    let rejectButton = this.props.reject ? (
      <button onClick={this.props.reject} className="btn btn-danger btn-sm">Reject</button>) : "";
    let fireButton = this.props.fire ? (
      <button onClick={this.props.fire} className="btn btn-danger btn-sm">Fire</button>) : "";
    let heroPartSize = this.props.itemSize ? "hero-part col-xs-12 " + this.props.itemSize : "hero-part col-xs-12";

    let gameRules = "";
    if (this.state.hero.public.rules.rulesSet && this.state.hero.public.rules.rulesSet.label) {
      gameRules = this.state.hero.public.rules.rulesSet.label;
    }

    if (this.props.justIcon) {
      return (
        <div
          onClick={this.props.onClicAction? this.props.onClicAction:""}
          style={{
              width:"75px",
              cursor: this.props.onClicAction?"pointer":"default",
              height: this.props.iconSize? this.props.iconSize : "150px"
              }}>
          <Icon
            size={{height: this.props.iconSize? this.props.iconSize : "150px"}}
            onlyImage={true}
            icon={this.state.hero.public.icon}
          />
        </div>
      );
    } else {
      return (
        <div onClick={this.props.onClicAction? this.props.onClicAction:""}
             style={{cursor: this.props.onClicAction?"pointer":"default"}}
             className={heroPartSize}>
          <div className="col-xs-12">
            <Icon icon={this.state.hero.public.icon}/>
            <div className="hero-bio-part">
              <span className="info-label">Name:</span>
              <span className="">{this.state.hero.public.name}</span>
              {gameRules ? (<span className="info-label">Rules set:</span>) : ""}
              {gameRules ? (<span className="">{gameRules}</span>) : ""}
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
    actions: bindActionCreators({updateHero, deleteHero,updateHeroPublicRules, loadPublicRules}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
