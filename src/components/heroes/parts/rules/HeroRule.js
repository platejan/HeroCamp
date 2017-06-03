import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import SelectInput from '../../../common/SelectInput';
import TextInput from '../../../common/TextInput';

class HeroRule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      state: false,
      error: false,
      display: false,
      edit: false,
      value: Object.assign({}, this.props).value
    };

    this.onchange = this.onchange.bind(this);
    this.validate = this.validate.bind(this);
    this.show = this.show.bind(this);
    this.onchangeRulesPublic = this.onchangeRulesPublic.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let state = Object.assign({}, this.state);
    state.value = Object.assign({}, nextProps).value;
    this.setState(state);
  }

  onchangeRulesPublic(event) {
    let state = Object.assign({}, this.state);
    state.value = event.target.value;
    this.setState(state);

    this.props.onchangeRulesPublic("" + event.target.name, event.target.value);
  }

  onchange(event) {
    let state = Object.assign({}, this.state);
    state.value = event.target.value;
    this.setState(state);

    if (this.validate(event.target.value)) {
      this.props.onchange("" + event.target.name, event.target.value);
    }
  }

  validate(value, data = this.props.rulesData, validate = this.props.content.editRules) {
    if (value && (!validate || eval(validate))) {
      let state = this.state;
      state.error = false;
      this.setState(state);
      return true;
    }
    else {
      let state = this.state;
      state.error = true;
      this.setState(state);
      return false;
    }
  }

  show(rule, data = this.props.rulesData) {
    console.log(data);
    if (rule) {
      return (eval(rule));
    } else {
      return (true);
    }
  }

  render() {
    let render = (<div className="row">
      <div className="col-xs-12">
        <dl className="dl-horizontal">
          <dt>{this.props.content.nameOfRule ? this.props.content.nameOfRule : this.props.name}</dt>
          <dd>{this.state.value.value ? this.state.value.value : this.state.value}</dd>
        </dl></div>
    </div>);

    if (this.props.edit || this.props.pj) {
      if (this.show(this.props.content.showRules)) {

        let label = this.props.content.nameOfRule ? this.props.content.nameOfRule : this.props.name;
        label += this.props.content.hint ? " (" + this.props.content.hint + ")" : "";
        switch (this.props.content.typeOfRuleValue.value) {
          case "select":
            render = (
              <div className="row">
                <div className="col-xs-12">
                  <SelectInput
                    style={this.state.error? {borderColor : "red"} : {}}
                    options={this.props.content.selectRestrictions}
                    name={this.props.name}
                    label={label}
                    onChange={this.props.edit? this.onchange:this.onchangeRulesPublic}
                    value={this.state.value.value? this.state.value.value : ""}
                  />
                </div>
              </div>);
            break;
          default:
            render = (
              <div className="row">
                <div className="col-xs-12">
                  <TextInput
                    style={this.state.error? {borderColor : "red"} : {}}
                    name={this.props.name}
                    label={label}
                    onChange={this.props.edit?this.onchange:this.onchangeRulesPublic}
                    value={this.state.value? this.state.value : ""}
                  />
                </div>
              </div>);
        }
      } else {
        render = "";
      }
    }
    return (
      <div className="row">
        {render}
      </div>
    );
  }
}
HeroRule.propTypes = {};

HeroRule.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroRule);
