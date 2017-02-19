import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';

class Rule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state={
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
    state.hasChange=true;
    return this.setState(state);
  }

  deleteRule() {
    this.props.deleteRule(this.state.ruleKey);
  }
  updateRule() {
    this.props.updateRule(this.state.ruleKey, this.state.currentState);
  }

  render() {
    return(
      <div className="rule-block">
        <form className="col-xs-12 row">
          <div className="col-xs-12 col-sm-6 row">
            <TextInput
              name="nameOfRule"
              label="name of new rule"
              onChange={this.onchange}
              value={this.state.currentState.nameOfRule}
              className=""
            />
          </div>
          <div className="col-xs-12 col-sm-6">
            <TextInput
              name="typeOfRuleValue"
              label='type of value ("number" or "string")'
              onChange={this.onchange}
              value={this.state.currentState.typeOfRuleValue}
              className=""
            />
          </div>
          <button
            type="button"
            onClick={this.deleteRule}
            className="btn btn-danger col-xs-12 col-sm-4 col-lg-3">
            <span className="glyphicon glyphicon-trash"> </span> Delete rule
          </button>
          <button
            type="button"
            onClick={this.updateRule}
            className="btn btn-default col-xs-12 col-sm-4 col-lg-3">
            <span className="glyphicon glyphicon-trash"> </span> Update rule
          </button>
        </form>
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
