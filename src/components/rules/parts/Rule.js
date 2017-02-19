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
      currentState: this.props.rule
    };

    this.onchange = this.onchange.bind(this);
    this.deleteRule = this.deleteRule.bind(this);
    this.updateRule = this.updateRule.bind(this);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state.currentState[field] = event.target.value;
    state.hasChange = true;
    return this.setState(state);
  }

  deleteRule() {
    this.props.deleteRule(this.state.ruleKey);
  }

  updateRule() {
    this.props.updateRule(this.state.ruleKey, this.state.currentState);
    let state = this.state;
    state.hasChange = false;
    return this.setState(state);
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
            <div className="row">
              <div className="col-xs-12 btn-group">
                <button
                  type="button"
                  onClick={this.deleteRule}
                  className="btn btn-danger">
                  <span className="glyphicon glyphicon-trash"> </span> Delete rule
                </button>
                {buttonSave}
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
