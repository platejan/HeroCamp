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

    let data = null;
    if (this.props.data) {
      data = Object.assign({}, this.props.data);
    }
    this.state = {
      data: data,
      hasChangeRules: this.props.hasChangeRules
    };

  }

  componentWillMount() {
    this.props.beforeMount();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState(
        {
          data: Object.assign({}, nextProps.data),
          hasChangeRules: nextProps.hasChangeRules
        });
    }
  }


  render() {
    let rules = "";
    console.log(this.state.data);
    if (this.state.data.rulesSet && this.props.publicRules[this.state.data.rulesSet.value]) {
      let data = Object.assign({}, this.props.publicRules[this.state.data.rulesSet.value]);
      let userData = Object.assign({}, this.state.data);
      let dataForEval = [];
      let dataArray = [];
      if (userData) {
        Object.keys(data).forEach(function (key, index) {
          if (userData[key]) {
            switch (data[key].typeOfRuleValue.value) {
              case "select":
                dataForEval[key] = userData[key].value ? userData[key].value : false;
                break;
              default:
                dataForEval[key] = userData[key] ? userData[key] : false;
                break;
            }
          } else {
            dataForEval[key] = false;
          }
        });
      }
      if (data) {
        Object.keys(data).forEach(function (key, index) {
          dataArray.push({ItemKey: key, ItemContent: data[key]});
        });
      }
      if (dataArray.length > 0) {
        rules = dataArray.map((Item, index) => {

          const itemKey = Item.ItemKey;
          const itemContent = Item.ItemContent;

          if (!itemContent.delete) {
            return (
              <HeroRule key={itemKey}
                        value={this.state.data[itemKey]?this.state.data[itemKey]:""}
                        name={itemKey}
                        onchangeRulesPublic={this.props.onchangeRulesPublic?this.props.onchangeRulesPublic:false}
                        pj={this.props.pj?this.props.pj:false}
                        content={Object.assign({},itemContent)}
                        onchange={this.props.onchangeRules}
                        edit={this.props.edit}
                        rulesData={dataForEval}/>
            );
          }
        });
      }
    }

    let publicChanges = "";
    if (this.props.edit && this.state.hasChangeRules && this.props.publishRules){
      publicChanges = (<button onClick={this.props.publishRules} style={{marginBottom:"15px"}} className="row btn btn-danger">Change Hero's Life!</button>);
    }
    return (
      <div className={this.props.className? this.props.className : ""}>
        {publicChanges}
        <HeroRulesSetSelect edit={this.props.edit} rulesSet={this.state.data.rulesSet}
                            onchangeRules={this.props.onchangeRules}/>
        <div className="marginTop15">
          {rules}
        </div>
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
