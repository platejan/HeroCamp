import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreateRule from './CreateRule';
import Rule from './Rule';
import {
  createRule,
  deleteRule,
  updateRule,
  loadRules,
  publishRulesSet,
  rejectRulesSet
} from '../../../actions/rulesActions';
import toastr from 'toastr';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

class RulesSet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      RulesSetKey: "",
      RulesSet: {
        autor: "",
        nameOfRulesSet: "",
        published: false,
        hasChange: false
      },
      Rules: null,
      tab: 0
    };

    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
    this.publish = this.publish.bind(this);
    this.reject = this.reject.bind(this);
    this.tabSwitch = this.tabSwitch.bind(this);
  }

  componentWillMount() {
    let newState = this.state;
    newState.RulesSetKey = this.props.RulesSetKey;
    newState.RulesSet = Object.assign({}, this.props.RulesSets[this.props.RulesSetKey]);
    this.setState(newState);
    this.props.startLoadingRules(this.props.RulesSetKey);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.RulesSetKey != this.state.RulesSetKey && nextProps.RulesSetKey) {
      let newState = this.state;
      newState.RulesSetKey = nextProps.RulesSetKey;
      this.setState(newState);
      this.props.startLoadingRules(nextProps.RulesSetKey);
    }

    if (nextProps.RulesSetKey && nextProps.RulesSetKey != this.state.RulesSetKey || nextProps.RulesSets[nextProps.RulesSetKey] != this.state.RulesSet || nextProps.Rules != this.state.Rules) {
      let newState = this.state;
      if (nextProps.RulesSetKey) {
        newState.RulesSet =  Object.assign({}, nextProps.RulesSets[nextProps.RulesSetKey]);
        newState.Rules = Object.assign({}, nextProps.Rules);
      }
      this.setState(newState);
    }
  }

  tabSwitch(index, last) {
    let newState = this.state;
    newState.tab = index;
    this.setState(newState);
  }

  publish() {
    let newState = this.state;
    newState.RulesSet.published = true;
    newState.RulesSet.hasChange = false;
    this.setState(newState);

    if (this.state.RulesSet.autor == this.props.currentUID) {
      this.props.actions.publishRulesSet(this.state.RulesSetKey, this.state.RulesSet, this.state.Rules, (error = null)=> {
        if (error == null) {

          toastr.success("published");
        } else {
          toastr.error(error);
        }
      });
    }
  }

  reject() {
    if (this.state.RulesSet.autor == this.props.currentUID) {
      this.props.actions.rejectRulesSet(this.state.RulesSetKey, (error = null)=> {
        if (error == null) {
          toastr.success("reverting changes success");
        } else {
          toastr.error(error);
        }
      });
    }
  }

  delete(key) {
    if (this.state.RulesSet.autor == this.props.currentUID) {
      this.props.actions.deleteRule(this.state.RulesSetKey, key, (error = null)=> {
        if (error == null) {
          toastr.success("Rule deleted. Do not forget publish changes.");
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
          toastr.success("Saved to draft. Do not forget publish changes.");
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
          toastr.success("Rule added. Do not forget publish changes.");
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
            const itemContent = Object.assign({}, Item.ItemContent, {});
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

      let hasChangeButtons = "";
      if (this.state.RulesSet.hasChange) {
        hasChangeButtons = (
          <div>
            <button className="btn btn-default" onClick={this.publish}>Publish</button>
            <button className="btn btn-danger" onClick={this.reject}>Reject</button>
          </div>
        );
      }


      return (
        <div>
          <h1>{this.state.RulesSet.nameOfRulesSet}</h1>
          <Tabs
            onSelect={this.tabSwitch}
            selectedIndex={this.state.tab}>
            <TabList>
              <Tab>Rules set detail</Tab>
              <Tab>Biography template</Tab>
              <Tab>Experience points</Tab>
            </TabList>
            <TabPanel>
              {hasChangeButtons}
            </TabPanel>
            <TabPanel>
              <CreateRule createRule={this.create}/>
              {rules}
            </TabPanel>
            <TabPanel>
            </TabPanel>
          </Tabs>
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
    actions: bindActionCreators({
      createRule,
      deleteRule,
      updateRule,
      loadRules,
      publishRulesSet,
      rejectRulesSet
    }, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RulesSet);
