import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {createPost} from '../../../actions/PostsActions';
import TextareaInput from '../../common/TextareaInput';
import {createNotification} from '../../../actions/notificationActions';
import {updateInventory} from './../../../actions/ChaptersActions';
import SimpleMDE  from 'react-simplemde-editor';
import Inventory from './Inventory';
import Experiences from './Experiences';
import SelectInput from '../../common/SelectInput';
import {Modal} from 'react-bootstrap';
import {updateHeroPublicRules} from '../../../actions/HeroesActions';

class CreatePost extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      text: "",
      inventory: {
        state: this.props.inventories[this.props.currentHero] ? this.props.inventories[this.props.currentHero] : {},
        future: this.props.inventories[this.props.currentHero] ? this.props.inventories[this.props.currentHero] : {},
        added: {},
        removed: {}
      },
      experiences: {},
      receivers: [],
      showInventory: false,
      showExperiences: false
    };
    this.createPost = this.createPost.bind(this);
    this.createPostHero = this.createPostHero.bind(this);
    this.createPostStoryteller = this.createPostStoryteller.bind(this);
    this.onchange = this.onchange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.inventoryChange = this.inventoryChange.bind(this);
    this.experiencesChanges = this.experiencesChanges.bind(this);
    this.toggleInventory = this.toggleInventory.bind(this);
    this.onchangeReceivers = this.onchangeReceivers.bind(this);
    this.toggleExperiences = this.toggleExperiences.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, {
      inventory: {
        state: Object.assign({}, nextProps.inventories[nextProps.currentHero] ? nextProps.inventories[nextProps.currentHero] : {}),
        future: Object.assign({}, nextProps.inventories[nextProps.currentHero] ? nextProps.inventories[nextProps.currentHero] : {}),
        added: {},
        removed: {},
        receivers: []
      }
    }));
  }

  createPostHero() {
    this.createPost("hero");
  }

  createPostStoryteller() {

    let data = this.state.experiences;
    let dataArray = [];
    if (data) {
      Object.keys(data).forEach(function (key, index) {
        dataArray.push({ItemKey: key, ItemContent: data[key]});
      });
      if (dataArray.length > 0) {
        dataArray.forEach((hero, index) => {
          const itemKey = hero.ItemKey;
          const itemContent = hero.ItemContent;

          let heroRules = this.props.heroes[itemKey].public.rules ? this.props.heroes[itemKey].public.rules : {};
          heroRules = Object.assign({}, heroRules);
          heroRules.experiences = (heroRules && heroRules.experiences) ? heroRules.experiences + itemContent : itemContent;
          this.props.actions.updateHeroPublicRules(heroRules, itemKey, this.props.heroes[itemKey].owner);
        });
      }
    }

    this.createPost("storyteller");
  }

  toggleInventory() {
    this.setState(Object.assign({}, this.state, {showInventory: !this.state.showInventory}));
  }

  toggleExperiences() {
    this.setState(Object.assign({}, this.state, {showExperiences: !this.state.showExperiences}));
  }

  inventoryChange(item) {
    let inventory = {
      state: Object.assign({}, this.state.inventory.state),
      future: Object.assign({}, this.state.inventory.future),
      added: Object.assign({}, this.state.inventory.added),
      removed: Object.assign({}, this.state.inventory.removed),
    };
    let count = item.type == "add" ? item.count : -1 * item.count;
    count = parseInt(count);

    if (!inventory.future[item.key]) {
      inventory.state[item.key] = {count: 0, name: item.name, weight: item.weight};
      inventory.future[item.key] = {count: 0, name: item.name, weight: item.weight};
    }

    let totalDelta = count;
    totalDelta += inventory.added[item.key] ? inventory.added[item.key].count : 0;
    totalDelta -= inventory.removed[item.key] ? inventory.removed[item.key].count : 0;

    delete inventory.added[item.key];
    delete inventory.removed[item.key];

    if (totalDelta > 0) {
      inventory.added[item.key] = {count: totalDelta, name: item.name, weight: item.weight}
    } else if (totalDelta < 0) {
      inventory.removed[item.key] = {count: totalDelta * (-1), name: item.name, weight: item.weight}
    }

    inventory.future[item.key] = Object.assign({}, inventory.future[item.key], {count: inventory.state[item.key].count + totalDelta});
    if (inventory.state[item.key].count == 0 && inventory.future[item.key].count == inventory.state[item.key].count) {
      delete inventory.future[item.key];
      delete inventory.state[item.key];
    }

    this.setState(Object.assign({}, this.state, {inventory: inventory}));
  }

  experiencesChanges(temp) {
    let exp = Object.assign({}, this.state.experiences);
    if (temp.count != 0) {
      exp[temp.heroKey] = temp.count;
    } else {
      delete exp[temp.heroKey];
    }
    this.setState(Object.assign({}, this.state, {experiences: exp}));
  }

  cancel() {
    let state = {
      inventory: {
        state: this.props.inventories[this.props.currentHero] ? this.props.inventories[this.props.currentHero] : {},
        added: {},
        removed: {}
      },
      receivers: [],
      experiences: {},
      text: ""
    };
    this.setState(Object.assign({}, this.state, state));
  }

  createPost(type = "hero") {
    let date = new Date();
    let name = false;
    if (type == "storyteller") {
      name = "storyteller";
    } else {
      name = this.props.heroes[this.props.currentHero] ? this.props.heroes[this.props.currentHero].public.name : "nameless";
    }
    let state = {
      date: date.toJSON(),
      name: name,
      text: this.state.text,
      inventory: this.state.inventory,
      receivers: [],
      experiences: type == "storyteller" ? this.state.experiences : {},
      storyteller: type == "storyteller" ? true : false
    };

    if (this.state.receivers.length > 0) {
      let receivers = this.state.receivers;
      Object.keys(this.state.receivers).forEach(function (key, index) {
        console.log(index);
        state.receivers.push(receivers[key].value);
      });
    }

    if (type == "hero") {
      let inventory = this.state.inventory.future ? this.state.inventory.future : this.state.inventory.state;
      this.props.actions.updateInventory(this.props.storyKey, this.props.chapterKey, this.props.currentHero, inventory, ()=> {
      });
    }

    this.props.actions.createPost(state, type == "hero" ? this.props.currentHero : this.props.userID, this.props.chapterKey, (error = null)=> {
      if (error == null) {
        toastr.success("sent");

        let heroes = this.props.heroes;
        let users = {};
        if (state.receivers.length > 0 && state.receivers.indexOf("all") < 0) {
          let userID = this.props.userID;
          Object.keys(state.receivers).forEach(function (key) {
            if (state.receivers[key] != "storyteller" && state.receivers[key] != "all" && heroes[state.receivers[key]].owner != userID)
              users[key] = heroes[state.receivers[key]].owner;
          });
        } else {
          let userID = this.props.userID;
          Object.keys(heroes).forEach(function (key) {
            if (heroes[key].owner != userID)
              users[key] = heroes[key].owner;
          });
        }

        this.props.actions.createNotification(
          {text: "New post in " + this.props.chapterName + " inside " + this.props.storyName + "."},
          users
        );

        this.setState(Object.assign({}, this.state, {text: "", experiences: {}}));
      } else {
        toastr.error(error);
      }
    });
  }

  onchangeReceivers(event) {
    let value = event.target.value;
    if (value.length > 1 && value[0].value == "all") {
      value.shift();
    }
    console.log(value);
    this.setState(Object.assign({}, this.state, {receivers: value}));
    console.log(this.state.receivers);
  }

  onchange(text) {
    let state = this.state;
    state.text = text;
    return this.setState(state);
  }

  render() {
    let hero = this.props.currentHero;
    let current = this.props.currentHero;

    let storyteller = false;
    if (this.props.storyOwner == this.props.userID) {
      storyteller = true;
    }

    if (hero || storyteller) {
      if (hero && (this.props.heroes[hero]))
        hero = this.props.heroes[hero].public.name;

      let receivers = [];
      if (hero && this.props.heroes) {
        const data = this.props.heroes;
        if (data) {
          Object.keys(data).forEach(function (key, index) {
            if (key != current) {
              receivers.push({value: key, label: data[key].public.name});
            }
          });
        }
        receivers.push({value: "storyteller", label: "storyteller"});
      }

      let defaultSelect = [];
      defaultSelect[0] = {value: "all", label: "all"};

      return (
        <div className="col-xs-12 CreatePostSimpleMDE">
          <SimpleMDE
            onChange={this.onchange}
            value={this.state.text}/>
          <div className="row" style={{marginTop:"-25px"}}>
            <div className="col-xs-12">
              <SelectInput
                name="receivers"
                value={this.state.receivers.length>0? this.state.receivers : defaultSelect}
                label="receivers"
                options={receivers}
                onChange={this.onchangeReceivers}
                clearable={true}
                multi={true}
              />
            </div>
          </div>
          {current ? (
            <div className="btn-group" style={{paddingRight:"15px"}}>
              <button onClick={this.createPostHero} className="btn btn-success">Send as {hero}</button>
              <button onClick={this.toggleInventory} className="btn btn-default">Inventory</button>
            </div>) : null}
          {storyteller ? (<div className="btn-group">
            <button onClick={this.createPostStoryteller} className="btn btn-primary">Send as storyteller</button>
            <button onClick={this.toggleExperiences} className="btn btn-default">Experiences</button>
          </div>) : ""}
          <div className="btn-group pull-right">
            <button onClick={this.cancel} className="btn btn-danger"><span
              className="glyphicon glyphicon-erase noText"></span></button>
          </div>
          <Modal show={this.state.showInventory} onHide={this.toggleInventory}>
            <Modal.Header closeButton>
              {hero}'s inventory
            </Modal.Header>
            <Modal.Body>
              {this.state.showInventory ? (
                <Inventory data={this.state.inventory}
                           change={this.inventoryChange}
                           keys={{storyKey:this.props.storyKey,ChapterKey: this.props.chapterKey,heroKey:this.props.currentHero}}/>
              ) : ""}
            </Modal.Body>
          </Modal>
          {storyteller ? (<Modal show={this.state.showExperiences} onHide={this.toggleExperiences}>
            <Modal.Header closeButton>
              Experiences
            </Modal.Header>
            <Modal.Body>
              {this.state.showExperiences ? (
                <Experiences data={this.state.experiences} change={this.experiencesChanges}/>
              ) : ""}
            </Modal.Body>
          </Modal>) : null}
          <div className="marginTop15"></div>
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
    actions: bindActionCreators({createPost, createNotification, updateInventory, updateHeroPublicRules}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
