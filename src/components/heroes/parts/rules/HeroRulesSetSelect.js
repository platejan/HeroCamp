import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SelectInput from '../../../common/SelectInput';
import {loadRulesSets} from '../../../../actions/rulesActions';

class HeroRulesSetSelect extends React.Component {
  constructor(props, context) {
    super(props, context);

    let rulesSet = null;
    if (this.props.rulesSet) {
      rulesSet = this.props.rulesSet;
    }
    this.state = {
      rulesSet: rulesSet
    };

    this.onchange = this.onchange.bind(this);
    this.selectRulesSet = this.selectRulesSet.bind(this);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state[field] = event.target.value;
    console.log(state);
    return this.setState(state);
  }

  selectRulesSet() {
    let key = this.state.rulesSet;
    this.props.onchangeRules("rulesSet", key);
  }

  render() {
    let render = (<div></div>);
    if (this.props.edit) {
      let rulesSets = [];
      const data = this.props.rules.rulesSets;
      if (data) {
        Object.keys(data).forEach(function (key, index) {
          if (data[key].published && !data[key].delete) {
            rulesSets.push({value: key, label: data[key].nameOfRulesSet});
          }
        });
      }

      render = (
        <div className="row">
          <div className="row">
            <div className="col-xs-12">
              <SelectInput
                name="rulesSet"
                value={this.state.rulesSet? this.state.rulesSet.value : ""}
                label="Game rules"
                options={rulesSets}
                onChange={this.onchange}
                clearable={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <button
                type="button"
                onClick={this.selectRulesSet}
                className="btn btn-success">
                <span className="glyphicon glyphicon-retweet"> </span> apply selected rules
              </button>
            </div>
          </div>
        </div>);
    } else {
      render = (<div>{this.state.rulesSet ? this.state.rulesSet.label : "RulesSet isn't selected."}</div>);
    }

    return (
      <div>
    {render}
        </div>
    );
  }
}
HeroRulesSetSelect.propTypes = {};

HeroRulesSetSelect.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroRulesSetSelect);
