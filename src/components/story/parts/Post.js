import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactMarkdown from 'react-markdown';
import Hero from './../../heroes/parts/Hero';
import Inventory from './Inventory';
import {Modal} from 'react-bootstrap';

class Post extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showInventory: false
    };
    this.deletePost = this.deletePost.bind(this);
    this.toggleInventory = this.toggleInventory.bind(this);
  }

  toggleInventory() {
    this.setState(Object.assign({}, this.state, {showInventory: !this.state.showInventory}));
  }

  deletePost() {
    console.log("delete me!" + this.props.itemKey);
    this.props.deletePost(this.props.itemKey);
  }

  render() {
    let render = this.props.itemContent.receivers ? false : true;
    if (this.props.itemContent.receivers && ((this.props.currentHero && this.props.itemContent.receivers.indexOf(this.props.currentHero) > -1 ) || (this.props.itemContent.receivers.indexOf("all") > -1))) {
      render = true;
    }
    if (this.props.storyOwner == this.props.userID || (this.props.currentHero && this.props.itemContent.autor && this.props.itemContent.autor == this.props.currentHero)) {
      render = true;
    }

    if (render) {
      let deletePostButton = "";
      if (this.props.storyOwner == this.props.userID) {
        deletePostButton = (<button onClick={this.deletePost} className="btn btn-xs btn-danger"><span
          className="glyphicon glyphicon-trash noText"></span></button>);
      }
      let inventoryButton = false;
      let inventory = false;
      if (!this.props.itemContent.storyteller && (this.props.storyOwner == this.props.userID || (this.props.heroes[this.props.itemContent.autor] && this.props.heroes[this.props.itemContent.autor].owner == this.props.userID) && this.props.itemContent.inventory)) {
        inventoryButton = (<button onClick={this.toggleInventory} className="btn btn-xs btn-default">
          <span className="glyphicon glyphicon-briefcase"/> inventory
        </button>);
        if (this.state.showInventory)
          inventory = (<Inventory data={this.props.itemContent.inventory?this.props.itemContent.inventory:false}/>);
      }
      let name = this.props.itemContent.storyteller ? "storyteller" : "undefined";
      let hero = false;
      if (!this.props.itemContent.storyteller && this.props.heroes[this.props.itemContent.autor]) {
        hero = this.props.heroes[this.props.itemContent.autor];
        name = hero.public.name;
      }
      let receivers = "";
      if (this.props.itemContent.receivers && (this.props.itemContent.receivers.indexOf("all") < 0)) {
        let receiversArray = this.props.itemContent.receivers;
        let heroes = this.props.heroes;
        Object.keys(receiversArray).forEach(function (key, index) {
          if (heroes[receiversArray[key]]) {
            if (receivers == "")
              receivers += " ";
            else
              receivers += ", ";
            receivers += heroes[receiversArray[key]].public.name;
          }
        });
      }

      let color = receivers ? "panel-info" : "panel-default";
      if (this.props.itemContent.storyteller) {
        color = "panel-success";
      }

      let inventoryChanges = false;
      if (this.props.itemContent.inventory) {
        let added = this.props.itemContent.inventory.added;
        let removed = this.props.itemContent.inventory.removed;
        let dataArray = [];

        if(added){
        Object.keys(added).forEach(function (key, index) {
          dataArray.push({ItemKey: key, ItemContent: added[key]});
        });}
        if(removed){
        Object.keys(removed).forEach(function (key, index) {
          dataArray.push({ItemKey: key, ItemContent: removed[key]});
        });}

        if (dataArray.length > 0) {
          inventoryChanges = dataArray.map((data, index) => {
            const itemKey = data.ItemKey;
            const itemContent = data.ItemContent;
            console.log(itemContent);
            return (
              <div key={"data" + itemKey} className="col-xs-12 col-sm-6" style={{padding:"7.5px",paddingTop:"15px",paddingBottom:"0"}}>
              <button style={{cursor:"pointer"}}
                   className={"col-xs-12 text-left btn btn-xs " + (added?(added[itemKey]? " btn-success":""):"")+(removed?(removed[itemKey]? " btn-danger":""):"")}>
                <span className="pull-left"><strong>{itemContent.name}</strong> (weight: {itemContent.weight} unit/s per piece)</span>
                <span className="badge pull-right" style={{marginLeft:"10px",marginTop:"2px"}}>{(added?(added[itemKey]?"+":"-"):"-")+" " + itemContent.count + " ks"}</span>
              </button></div> );
          });
        }

      }
      return (
        <div className="">
          <div style={{position:"absolute"}}>
            {hero ? (<Hero justIcon={true} iconSize={"150px"} itemKey={this.props.itemContent.autor}
                           itemContent={hero} itemSize=""/>) : ""}
          </div>
          <div style={{paddingLeft:"75px"}}>
            <div className={"panel "+ color} style={{minHeight:"150px"}}>
              <div className="panel-heading">
                {name}
                {this.props.itemContent.date ? (<small
                  className="text-muted"
                  style={{paddingLeft:"5px"}}>{"(" + (new Date(this.props.itemContent.date)).toLocaleString() + ")"}</small>) : ""}
                <div className="btn-group pull-right">
                  {inventoryButton}
                  {deletePostButton}
                </div>
              </div>
              <div className="panel-body">
                {receivers ? (<p className="" style={{fontStyle:"italic"}}>Private post for: {receivers}</p>) : ""}
                <ReactMarkdown source={this.props.itemContent.text} softBreak="br"/>
                {inventoryChanges ? (<div className="row" style={{padding:"7.5px",paddingTop:"0",paddingBottom:"0"}}>{inventoryChanges}</div>) : false}
              </div>
            </div>
          </div>
          {inventoryButton ? (
            <Modal show={this.state.showInventory} onHide={this.toggleInventory}>
              <Modal.Header closeButton>
                {name}'s inventory
              </Modal.Header>
              <Modal.Body>
                {inventory}
              </Modal.Body>
            </Modal>
          ) : ""}

        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}

Post.propTypes = {
  userID: PropTypes.string.isRequired
};

Post.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    currentHero: state.currentStory.selectedHero,
    heroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
