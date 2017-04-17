import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from './../../common/TextInput';
import CreatableSelectInput from './../../common/CreatableSelectInput';

class Inventory extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: {},
      text: "",
      count: 0,
      valid: false
    };
    this.onchange = this.onchange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    if (field == "count") {
      if (event.target.value != "") {
        let count = parseInt(event.target.value);
        state[field] = count >= 0 ? count : 0;
        state.valid = false;
        console.log(this.props.data.future);
        if (this.props.data.future[this.state.selected.value]) {
          console.log(this.props.data.future[this.state.selected.value].count);
          if (this.props.data.future[this.state.selected.value].count >= count) {
            state.valid = true;
          }
        }
      } else
        state[field] = 0;
    } else
      state[field] = event.target.value;
    console.log(state);
    return this.setState(state);
  }

  remove() {
    if (this.state.valid) {
      let operation = {
        type: "remove",
        key: this.state.selected.value,
        count: this.state.count
      };
      this.setState(Object.assign({}, this.state, {count: 0, selected: {}, valid: false}));
      this.props.change(operation);
    }
  }

  add() {
    let operation = {
      type: "add",
      key: this.state.selected.value,
      count: this.state.count
    };
    this.setState(Object.assign({}, this.state, {count: 0, selected: {}, valid: false}));
    this.props.change(operation);
  }

  render() {
    if (this.props.data) {
      let added = this.props.data.added?this.props.data.added:{};
      let removed = this.props.data.removed?this.props.data.removed:{};
      let future = this.props.data.future?this.props.data.future:{};
      const data = this.props.data.state?this.props.data.state:{};
      let dataArray = [];
      let choices = [];
      let list = "";
      if (data) {
        Object.keys(data).forEach(function (key, index) {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          dataArray.push({ItemKey: key, ItemContent: data[key]});
        });
        if (dataArray.length > 0) {
          list = dataArray.map((data, index) => {

            const itemKey = data.ItemKey;
            const itemContent = data.ItemContent;
            const itemIndex = "data" + itemKey;
            choices.push({value: itemKey, label: itemKey});

            return (
              <li key={itemIndex}
                  className={"list-group-item" + (added[itemKey]? " list-group-item-success":"")+(removed[itemKey]? " list-group-item-danger":"")}>
                <span className="badge" style={{marginLeft:"10px"}}>{future[itemKey].count + " ks"}</span>
                <strong>{itemKey}</strong>
                <span className="pull-right" style={{margin:"0px 2px"}}>=</span>
                {added[itemKey] ? (<span className="pull-right text-success"
                                         style={{margin:"0px 2px"}}>{" + " + added[itemKey].count + " ks "}</span>) : ""}
                {removed[itemKey] ? (<span className="pull-right text-danger"
                                           style={{margin:"0px 2px"}}>{" - " + removed[itemKey].count + " ks "}</span>) : ""}
                <span className="pull-right" style={{margin:"0px 2px"}}>{itemContent.count + " ks "}</span>
              </li> );
          });
        }
      }
      return (
        <div className="">
          <div className="row">
            <div className="col-xs-12">
              <ul className="list-group" style={{marginBottom:"0px"}}>
                {list}
              </ul>
            </div>
          </div>
          {this.props.change ?
            (<div className="row marginTop15">
                <div className="col-xs-12 col-lg-6">
                  <CreatableSelectInput
                    name="selected"
                    value={this.state.selected}
                    label="Item"
                    options={choices}
                    onChange={this.onchange}
                    multi={false}
                  />
                </div>
                <div className="col-xs-12 col-lg-6">
                  <TextInput type="text" name="count" label="count" onChange={this.onchange}
                             value={""+this.state.count}/>
                </div>
                <div className="col-xs-12">
                  <div className="btn-group pull-right">
                    <button onClick={this.add} className="btn btn-success">
                      <span className="glyphicon glyphicon-plus"/>
                      Add
                    </button>
                    <button onClick={this.remove} className={"btn btn-danger"+ (this.state.valid? "" :"disabled")}>
                      <span className="glyphicon glyphicon-remove"/>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : ""}
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }

}

Inventory.propTypes = {};

Inventory.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
