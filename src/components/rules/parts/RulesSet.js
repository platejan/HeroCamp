import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreateRule from './CreateRule';
import Rule from './Rule';
import {createRule, deleteRule, updateRule, loadRules} from '../../../actions/rulesActions';
import toastr from 'toastr';

class RulesSet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      RulesSetKey: "",
      RulesSet: {
        autor: "",
        nameOfRulesSet: ""
      },
      Rules: null
    };

    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
  }

  componentWillMount() {
    let newState = this.state;
    newState.RulesSetKey = this.props.RulesSetKey;
    this.setState(newState);
    console.log("RulesSet Created");
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.RulesSetKey != this.state.RulesSetKey && nextProps.RulesSetKey){
      let newState = this.state;
      newState.RulesSetKey = nextProps.RulesSetKey;
      this.setState(newState);
      this.props.startLoadingRules(nextProps.RulesSetKey);
    }

    if (nextProps.RulesSetKey && nextProps.RulesSetKey != this.state.RulesSetKey || nextProps.RulesSets[nextProps.RulesSetKey] != this.state.RulesSet || nextProps.Rules != this.state.Rules) {
      let newState = this.state;
      if (nextProps.RulesSetKey) {
        newState.RulesSet = nextProps.RulesSets[nextProps.RulesSetKey];
        newState.Rules = nextProps.Rules;
      }
      this.setState(newState);
    }

    console.log("current:");
    console.log(this.state);
    console.log("next:");
    console.log(nextProps);
  }

  delete(key) {
    if (this.state.RulesSet.autor == this.props.currentUID) {
      this.props.actions.deleteRule(this.state.RulesSetKey, key, (error = null)=> {
        if (error == null) {
          toastr.success("deleted");
        } else {
          toastr.error(error);
        }
      });
    }
  }

  update(RuleKey, rule) {
    if (this.state.RulesSet.autor == this.props.currentUID) {
      this.props.actions.updateRule(this.state.RulesSetKey, RuleKey, rule, (error = null)=> {
        if (error == null) {
          toastr.success("saved");
        } else {
          toastr.error(error);
        }
      });
    }
  }

  create(rule) {
    if (rule.nameOfRule != "" && this.state.RulesSet.autor == this.props.currentUID) {
      this.props.actions.createRule(this.state.RulesSetKey, rule, (error = null)=> {
        if (error == null) {
          toastr.success("rule added");
        } else {
          toastr.error(error);
        }
      });
    } else {
      toastr.error("Rule must have a name.");
    }
  }

  render() {
    if (this.props.RulesSetKey != this.state.RulesSetKey) {
      this.forceUpdate();
    }
    if (this.state.RulesSetKey) {

      let rules = "";

      if (this.state.Rules) {
        const data = this.state.Rules;
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
            const ruleKey = "rule" + itemKey;
            let trash = "";
            if (!Item.ItemContent.delete) {
              return (
                <Rule updateRule={this.update} key={ruleKey} deleteRule={this.delete} autor={this.state.RulesSet.autor}
                      rule={itemContent} ruleKey={itemKey} rulesSetKey={this.state.RulesSetKey}/>
              );
            }
          });
        }
      }
      return (
        <div>
          <h1>{this.state.RulesSet.nameOfRulesSet}</h1>
          <CreateRule createRule={this.create}/>
          {rules}
        </div>
      );
    } else {
      return (<div></div>);
    }

  }
}
RulesSet.propTypes = {};

RulesSet.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {

    currentUID: state.auth.currentUserUID,
    RulesSetKey: state.rules.current,
    RulesSets: state.rules.rulesSets,
    Rules: state.rules.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startLoadingRules: (key) => {
      dispatch(loadRules(key));
    },
    actions: bindActionCreators({createRule, deleteRule, updateRule, loadRules}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RulesSet);
