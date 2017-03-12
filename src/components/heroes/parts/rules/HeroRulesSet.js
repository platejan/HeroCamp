import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SelectInput from '../../../common/SelectInput';
import {loadRulesSets} from '../../../../actions/rulesActions';
import HeroRulesSetSelect from './HeroRulesSetSelect';

class HeroRulesSet extends React.Component {
  constructor(props, context) {
    super(props, context);

    let rulesSet = null;
    console.log(this.props.data);
    if(this.props.data.rulesSet){
      rulesSet = this.props.data.rulesSet;
    }
    this.state = {
      rulesSet: rulesSet
    };

    this.onchange = this.onchange.bind(this);
  }

  componentWillMount() {
    this.props.beforeMount();
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state[field] = event.target.value;
    console.log(state);
    return this.setState(state);
  }

  render() {
    return (
      <div className={this.props.className? this.props.className : ""}>
          <HeroRulesSetSelect rulesSet={this.state.rulesSet} onchangeRules={this.props.onchangeRules}/>
      </div>
    );
  }
}
HeroRulesSet.propTypes = {};

HeroRulesSet.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    rules: state.rules
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
