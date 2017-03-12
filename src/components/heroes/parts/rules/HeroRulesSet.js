import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SelectInput from '../../../common/SelectInput';
import {loadRulesSets} from '../../../../actions/rulesActions';
import HeroRulesSetSelect from './HeroRulesSetSelect';
import HeroRule from './HeroRule';

class HeroRulesSet extends React.Component {
  constructor(props, context) {
    super(props, context);

    let rulesSet = null;
    if (this.props.data.rulesSet) {
      rulesSet = Object.assign({},this.props.data.rulesSet);
    }
    this.state = {
      rulesSet: rulesSet
    };

    this.onchange = this.onchange.bind(this);
  }

  componentWillMount() {
    this.props.beforeMount();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.data.rulesSet) {
      this.setState({rulesSet: Object.assign({},nextProps.data.rulesSet)});
    }
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state[field] = event.target.value;
    return this.setState(state);
  }

  render() {
    console.log("render...");
    let rules = "";
    if (this.state.rulesSet && this.props.publicRules[this.state.rulesSet.value]) {
      console.log("some rules...");
      const data = this.props.publicRules[this.state.rulesSet.value];
      let dataArray = [];
      if (data) {
        Object.keys(data).forEach(function (key, index) {
          dataArray.push({ItemKey: key, ItemContent: data[key]});
        });
      }
      if (dataArray.length > 0) {
        rules = dataArray.map((Item, index) => {

          const itemKey = Item.ItemKey;
          const itemContent = Item.ItemContent;

          return (
            <HeroRule key={itemKey}
                      value={this.props.data[itemKey]? this.props.data[itemKey] : ""}
                      name={itemKey}
                      content={itemContent}
                      onchange={this.props.onchangeRules}
                      edit={this.props.edit}/>
          );
        });
      }
    }
    return (
      <div className={this.props.className? this.props.className : ""}>
        <HeroRulesSetSelect edit={this.props.edit} rulesSet={this.state.rulesSet}
                            onchangeRules={this.props.onchangeRules}/>
        {rules}
      </div>
    );
  }
}
HeroRulesSet.propTypes = {};

HeroRulesSet.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    publicRules: state.rules.publicRules
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
