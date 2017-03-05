import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';
import CreatableSelectInput from '../../common/CreatableSelectInput';

class Rule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hasChange: false,
      ruleKey: this.props.ruleKey,
      savedState: this.props.rule,
      currentState: this.props.rule,
      detail: false,
    };

    this.onchange = this.onchange.bind(this);
    this.deleteRule = this.deleteRule.bind(this);
    this.updateRule = this.updateRule.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
    this.toggleLeveling = this.toggleLeveling.bind(this);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state.currentState[field] = event.target.value;
    state.hasChange = true;
    return this.setState(state);
  }

  toggleDetail() {
    let state = this.state;
    if (state.detail)
      state.detail = false;
    else
      state.detail = true;
    return this.setState(state);
  }
  toggleLeveling() {
    let state = this.state;
    if (state.leveling)
      state.leveling = false;
    else
      state.leveling = true;
    return this.setState(state);
  }

  deleteRule() {
    this.props.deleteRule(this.state.ruleKey);
  }

  updateRule() {
    let state = this.state;
    state.hasChange = false;
    this.setState(state);
    this.props.updateRule(this.state.ruleKey, this.state.currentState);
  }

  render() {
    let options = [
      {value: 'number', label: 'Number'},
      {value: 'string', label: 'String'},
      {value: 'select', label: 'Select'}
    ];

    let buttonSave = "";
    if (this.state.hasChange) {
      buttonSave = (<button
        type="button"
        onClick={this.updateRule}
        className="btn btn-default">
        <span className="glyphicon glyphicon-floppy-disk"> </span> Save changes
      </button>);
    }

    let restrictions = "";
    if (this.state.currentState.typeOfRuleValue.value == "select") {
      restrictions = (
        <div className="row">
          <div className="col-xs-12">
            <CreatableSelectInput
              name="selectRestrictions"
              value={this.state.currentState.selectRestrictions}
              label="type of rule value"
              options={[]}
              onChange={this.onchange}
              multi={true}
            />
          </div>
        </div>
      );
    }

    let detail = "";
    let readWriteOptions = [
      {value: 'readOnly', label: 'Read only'},
      {value: 'readWriteOnce', label: 'Read, once writable'},
      {value: 'readWrite', label: 'Read, Write'}
    ];
    if (this.state.detail) {
      detail = (
        <div className="row">
          <div className="col-xs-12">
            <SelectInput
              name="readWrite"
              value={this.state.currentState.readWrite ? this.state.currentState.readWrite.value : "readWrite"}
              label="editing rights"
              options={readWriteOptions}
              onChange={this.onchange}
            />
          </div>
          <div className="col-xs-12">
            <TextInput
              name="showRules"
              label="show rules for input (must return true/false)"
              onChange={this.onchange}
              value={this.state.currentState.showRules ? this.state.currentState.showRules : "true"}
              className=""
            />
            <TextInput
              name="editRules"
              label="validate rules for input value (must return true/false)"
              onChange={this.onchange}
              value={this.state.currentState.editRules ? this.state.currentState.editRules : "true"}
              className=""
            />
          </div>
        </div>
      );
    }
    let leveling = "";
    let levelingOptions = [
      {value: true, label: 'Yes'},
      {value: false, label: 'No'}
    ];
    if (this.state.leveling) {
      leveling = (
        <div className="row">
          <div className="col-xs-6">
            <SelectInput
              name="levelOption"
              value={this.state.currentState.levelOption ? this.state.currentState.levelOption.value : false}
              label="have levels"
              options={levelingOptions}
              onChange={this.onchange}
            />
          </div>
          <div className="col-xs-6">
            <TextInput
              name="levelPointsExpression"
              label="expresion for next level (must return count of points)"
              onChange={this.onchange}
              value={this.state.currentState.levelPointsExpression? this.state.currentState.levelPointsExpression : "6"}
              className=""
            />
          </div>
        </div>
      );
    }
    return (
      <div className="panel panel-default">
        <div className=" panel-body">
          <form className="col-xs-12 row">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <TextInput
                  name="nameOfRule"
                  label="name of new rule"
                  onChange={this.onchange}
                  value={this.state.currentState.nameOfRule}
                  className=""
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <SelectInput
                  name="typeOfRuleValue"
                  value={this.state.currentState.typeOfRuleValue.value}
                  label="type of rule value"
                  options={options}
                  onChange={this.onchange}
                />
              </div>
            </div>
            {restrictions}
            <div className="row">
              <div className="col-xs-12">
                <TextInput
                  name="hint"
                  label="hint"
                  onChange={this.onchange}
                  value={this.state.currentState.hint}
                  className=""
                />
              </div>
            </div>
            {detail}
            {leveling}
            <div className="row">
              <div className="col-xs-12 btn-group">
                <button
                  type="button"
                  onClick={this.deleteRule}
                  className="btn btn-danger">
                  <span className="glyphicon glyphicon-trash"> </span> Delete rule
                </button>
                {buttonSave}
                <button
                  type="button"
                  onClick={this.toggleDetail}
                  className={this.state.detail ? "btn btn-default btn-info" : "btn btn-default"}>
                  <span className="glyphicon glyphicon-list-alt"> </span> Advance
                </button>
                <button
                  type="button"
                  onClick={this.toggleLeveling}
                  className={this.state.leveling ? "btn btn-default btn-info" : "btn btn-default"}>
                  <span className="glyphicon glyphicon-signal"> </span> Leveling options
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Rule.propTypes = {};

Rule.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
