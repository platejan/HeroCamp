import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';
import CreatableSelectInput from '../../common/CreatableSelectInput';

class CreateRule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.initialState = {
      nameOfRule: "",
      typeOfRuleValue: {
        value: "string",
        label: "String"
      },
      selectRestrictions: [],
      hint: ""
    };
    this.state = this.initialState;

    this.onchange = this.onchange.bind(this);
    this.createRule = this.createRule.bind(this);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state[field] = event.target.value;
    return this.setState(state);
  }

  createRule() {
    this.props.createRule(this.state);
    this.onchange({target: {name: "nameOfRule", value:""}});
    this.onchange({target: {name: "hint", value: ""}});
    this.onchange({target: {name: "selectRestrictions", value: []}});
  }

  render() {
    let options = [
      {value: 'number', label: 'Number'},
      {value: 'string', label: 'String'},
      {value: 'select', label: 'Select'}
    ];

    let restrictions = "";
    if (this.state.typeOfRuleValue.value == "select") {
      restrictions = (
        <div className="row">
          <div className="col-xs-12">
            <CreatableSelectInput
              name="selectRestrictions"
              value={this.state.selectRestrictions}
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
                  value={this.state.nameOfRule}
                  className=""
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <SelectInput
                  name="typeOfRuleValue"
                  value={this.state.typeOfRuleValue.value}
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
                  value={this.state.hint}
                  className=""
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 btn-group">
                <button
                  type="button"
                  onClick={this.createRule}
                  className="btn btn-primary">
                  <span className="glyphicon glyphicon-plus"> </span> Create rule
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
CreateRule.propTypes = {};

CreateRule.contextTypes = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateRule);
