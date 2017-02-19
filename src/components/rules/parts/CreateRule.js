import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';

class CreateRule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.initialState = {
      nameOfRule: "",
      typeOfRuleValue: ""
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
    this.setState(this.initialState);
  }

  render() {
    return (
      <div>
        <form className="col-xs-12 row">
          <div className="col-xs-12 col-sm-6 row">
            <TextInput
              name="nameOfRule"
              label="name of new rule"
              onChange={this.onchange}
              value={this.state.nameOfRule}
              className=""
            />
          </div>
          <div className="col-xs-12 col-sm-6">
            <TextInput
              name="typeOfRuleValue"
              label='type of value ("number" or "string")'
              onChange={this.onchange}
              value={this.state.typeOfRuleValue}
              className=""
            />
            </div>
          <button
            type="button"
            onClick={this.createRule}
            className="btn btn-primary col-xs-12 col-sm-4 col-lg-3">
            <span className="glyphicon glyphicon-plus"> </span> Create rule
          </button>
        </form>
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
