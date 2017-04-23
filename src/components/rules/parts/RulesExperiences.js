import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TextInput from './../../common/TextInput';
import CreatableSelectInput from './../../common/CreatableSelectInput';

class RulesExperiences extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: this.props.data ? this.props.data : {},
      levelUp: this.props.leveling && this.props.leveling.levelUp? this.props.leveling.levelUp:"",
      abilityPointsPerLevel: this.props.leveling && this.props.leveling.abilityPointsPerLevel? this.props.leveling.abilityPointsPerLevel:"",
      selected: {},
      name: "",
      maxLevel: 0,
      info: "",
      display: "true"
    };
    this.onchange = this.onchange.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.loadValues = this.loadValues.bind(this);
    this.saveLevels = this.saveLevels.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    this.setState(Object.assign(this.state, {data: nextprops.data}));
  }

  loadValues(value, label) {
    this.onchange({target: {name: "selected", value: {value: value, label: label}}});
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    if (field == "maxLevel") {
      if (event.target.value != "" && !isNaN(event.target.value)) {
        let maxLevel = parseInt(event.target.value);
        state["maxLevel"] = maxLevel >= 0 ? maxLevel : 0;
      } else
        state[field] = 0;
    } else if (field == "display") {
      state[field] = "" + event.target.value;
    } else {
      state[field] = event.target.value;
      if (event.target.value.value) {
        if (this.state.data[event.target.value.value]) {
          console.log(this.state);
          state = Object.assign({}, this.state, this.state.data[event.target.value.value], {data: this.state.data});
          console.log(state);
        }
        else {
          state = Object.assign(this.state, {
            selected: event.target.value,
            name: event.target.value.value,
            info: ""
          });
        }
      }
    }
    console.log(state);
    return this.setState(state);
  }

  remove() {
    let data = Object.assign({}, this.state.data);
    if (data[this.state.selected.value]) {
      delete data[this.state.selected.value];
      this.props.onchange("abilities", data);
      this.setState(Object.assign(this.state, {data: data}));
    }
  }

  save() {
    if (this.state.selected.value && this.state.selected.value != "") {
      let newData = Object.assign({}, this.state);
      delete newData.data;
      delete newData.levelUp;
      delete newData.abilityPointsPerLevel;
      let data = Object.assign({}, this.state.data, {[newData.name]: newData});
      console.log(data);
      this.props.onchange("abilities", data);
      this.setState(Object.assign({}, this.state, {data: data}, {
        selected: {},
        name: "",
        maxLevel: 0,
        info: "",
        display: true
      }));
    }
  }

  saveLevels() {
    let leveling = {levelUp: this.state.levelUp, abilityPointsPerLevel: this.state.abilityPointsPerLevel};
    this.props.onchange("leveling", leveling);
  }

  render() {
    const data = this.state.data ? this.state.data : {};
    let dataArray = [];
    let choices = [];
    let list = "";
    if (data) {
      Object.keys(data).forEach(function (key, index) {
        dataArray.push({ItemKey: key, ItemContent: data[key]});
      });
      if (dataArray.length > 0) {
        list = dataArray.map((data, index) => {

          const itemKey = data.ItemKey;
          const itemContent = data.ItemContent;
          const itemIndex = "data" + itemKey;

          choices.push({value: itemContent.name, label: itemContent.name});

          console.log(itemContent.name);
          console.log(itemContent);
          return (
            <li key={itemIndex} onClick={()=>{this.loadValues(itemContent.name,itemContent.name)}}
                className="list-group-item">
              <h4 className="list-group-item-heading">{itemContent.name}</h4>
              <dl className="dl-horizontal">
                <dt>maximum ability level:</dt>
                <dd>{itemContent.maxLevel}</dd>
                <dt>display:</dt>
                <dd>{itemContent.display}</dd>
                <dt>info:</dt>
                <dd>{itemContent.info}</dd>
              </dl>
            </li>
          );
        });
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Levels</h2>
        </div>
        <div className="col-xs-12">
          <div className="panel panel-default panel-body">
            <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <TextInput type="text" name="levelUp" label="count of experience per level" onChange={this.onchange}
                               value={""+this.state.levelUp}/>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <TextInput type="text" name="abilityPointsPerLevel" label="ability points per level"
                               onChange={this.onchange}
                               value={""+this.state.abilityPointsPerLevel}/>
                  </div>
                  <div className="col-xs-12">
                    <button className="btn btn-success pull-right" onClick={this.saveLevels}>
                      <span className="glyphicon glyphicon-plus"></span> Save
                    </button>
                  </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          <h2>Abilities</h2>
        </div>
        <div className="col-xs-12">
          <ul className="list-group" style={{marginBottom:"0px"}}>
            {list}
          </ul>
        </div>
        <div className="col-xs-12 marginTop15">
          <div className="panel panel-default panel-body">
            <div className="row">
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-12 col-sm-8">
                    <CreatableSelectInput
                      name="selected"
                      value={this.state.selected}
                      label="name"
                      options={choices}
                      onChange={this.onchange}
                      multi={false}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-4">
                    <TextInput type="text" name="maxLevel" label="maximum ability level" onChange={this.onchange}
                               value={""+this.state.maxLevel}/>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <TextInput type="text" name="info" label="info" onChange={this.onchange}
                               value={""+this.state.info}/>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <TextInput type="text" name="display" label="display expression (must return true/false)"
                               onChange={this.onchange}
                               value={""+this.state.display}/>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 btn-group text-right">
                <button className="btn btn-success" onClick={this.save}>
                  <span className="glyphicon glyphicon-plus"></span> Save ability
                </button>
                <button className="btn btn-danger" onClick={this.remove}>
                  <span className="glyphicon glyphicon-trash"></span> Delete ability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RulesExperiences.propTypes = {};

RulesExperiences.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RulesExperiences);
