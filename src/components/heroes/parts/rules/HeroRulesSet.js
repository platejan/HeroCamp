import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SelectInput from '../../../common/SelectInput';
import {loadRulesSets} from '../../../../actions/rulesActions';

class HeroRulesSet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rulesSet: null
    };

    this.onchange = this.onchange.bind(this);
    this.selectRulesSet = this.selectRulesSet.bind(this);
  }

  componentWillMount() {
    this.props.beforeMount();
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state.currentState[field] = event.target.value;
    return this.setState(state);
  }

  selectRulesSet(key) {
    console.log("selected RulesSetKey: " +key);
  }

  render() {
    let rulesSets = [
      {value: 'number', label: 'Number'},
      {value: 'string', label: 'String'},
      {value: 'select', label: 'Select'}
    ];

    return (
      <div className={this.props.className? this.props.className : ""}>
          <div className="col-xs-12 row">
            <div className="row">
              <div className="col-xs-12">
                <SelectInput
                  name="rulesSet"
                  value={this.state.rulesSet}
                  label="Game rules"
                  options={rulesSets}
                  onChange={this.onchange}
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
          </div>
      </div>
    );
  }
}
HeroRulesSet.propTypes = {};

HeroRulesSet.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beforeMount: () => {
      dispatch(loadRulesSets());
    },
    actions: bindActionCreators({loadRulesSets}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroRulesSet);
