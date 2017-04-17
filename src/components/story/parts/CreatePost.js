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
import {Modal} from 'react-bootstrap';

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
      showInventory: false
    };
    this.createPost = this.createPost.bind(this);
    this.onchange = this.onchange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.inventoryChange = this.inventoryChange.bind(this);
    this.toggleInventory = this.toggleInventory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({},this.state,{inventory:{
      state: Object.assign({},nextProps.inventories[nextProps.currentHero] ? nextProps.inventories[nextProps.currentHero] : {}),
      future: Object.assign({},nextProps.inventories[nextProps.currentHero] ? nextProps.inventories[nextProps.currentHero] : {}),
      added: {},
      removed: {}
    }}));
  }
  toggleInventory() {
    this.setState(Object.assign({}, this.state, {showInventory: !this.state.showInventory}));
  }

  inventoryChange(item) {
    let inventory = this.state.inventory;
    let count = item.type == "add" ? item.count : -1 * item.count;
    count = parseInt(count);

    if (!inventory.future[item.key]) {
      inventory.state[item.key] = {count: 0};
      inventory.future[item.key] = {count: 0};
    }

    let totalDelta = count;
    totalDelta += inventory.added[item.key]? inventory.added[item.key].count: 0;
    totalDelta -= inventory.removed[item.key]? inventory.removed[item.key].count: 0;

    delete inventory.added[item.key];
    delete inventory.removed[item.key];

    if(totalDelta>0){
      inventory.added[item.key] = {count: totalDelta}
    }else if(totalDelta<0){
      inventory.removed[item.key] = {count: totalDelta*(-1)}
    }

    inventory.future[item.key].count =inventory.state[item.key].count+totalDelta;
    if(inventory.state[item.key].count == 0 && inventory.future[item.key].count == inventory.state[item.key].count)
    {
      delete inventory.future[item.key];
      delete inventory.state[item.key];
    }

    this.setState(Object.assign({}, this.state, {inventory: inventory}));
  }

  cancel() {
    let state = {
      inventory: {
        state: this.props.inventories[this.props.currentHero] ? this.props.inventories[this.props.currentHero] : {},
        added: {},
        removed: {}
      }
    };
    this.setState(Object.assign({}, this.state, state));
  }

  createPost() {
    let date = new Date();
    let state = {
      date: date.toJSON(),
      text: this.state.text,
      inventory: this.state.inventory
    };

    let inventory = this.state.inventory.future?this.state.inventory.future:this.state.inventory.state;
    this.props.actions.updateInventory(this.props.storyKey,this.props.chapterKey,this.props.currentHero,inventory,()=>{});

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

        this.setState(Object.assign({}, this.state, {text: ""}));
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
          <div className="btn-group">
            <button onClick={this.createPost} className="btn btn-success">Send post as {hero}</button>
            <button onClick={this.toggleInventory} className="btn btn-default">Inventory</button>
          </div>
          <button onClick={this.cancel} className="btn btn-danger pull-right">reset form & inventory changes</button>
          <Modal show={this.state.showInventory} onHide={this.toggleInventory}>
            <Modal.Header closeButton>
              {hero}'s inventory
            </Modal.Header>
            <Modal.Body>
              {this.state.showInventory?(
                <Inventory data={this.state.inventory}
                           change={this.inventoryChange}
                           keys={{storyKey:this.props.storyKey,ChapterKey: this.props.chapterKey,heroKey:this.props.currentHero}}/>
              ):""}
            </Modal.Body>
          </Modal>
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
    actions: bindActionCreators({createPost, createNotification,updateInventory}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
