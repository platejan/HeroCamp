import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreateRulesSet from './parts/CreateRulesSet';
import RulesSet from './parts/RulesSet';
import RulesToolbar from './parts/RulesToolbar';
import {loadRulesSets} from '../../actions/rulesActions';

class RulesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};

  }

  componentWillMount() {
    this.props.beforeMount();
  }

  render() {
    return (
      <div>
        <div className="col-xs-12 col-sm-4 col-lg-3">
          <RulesToolbar/>
          <CreateRulesSet/>
        </div>
        <div className="col-xs-12 col-sm-8 col-lg-9">
          <RulesSet/>
        </div>
      </div>
    );
  }
}
RulesPage.propTypes = {};

RulesPage.contextTypes = {};

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
    actions: bindActionCreators({}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RulesPage);
