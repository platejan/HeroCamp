import React from 'react';
import Header from './common/Header';
import Navigation from './common/Navigation'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../actions/authActions';

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {auth, actions, loading, user} = this.props;
    return (
      <div className="container-fluid clean-margin-padding">
        <div className="row clean-margin-padding">
          <div className="col-xs-12 text-right clean-margin-padding">
            <Header signOut={actions.signOut} auth={auth} loading={loading} user={user}/>
          </div>
        </div>
        <div className="row clean-margin-padding">
          <div className="col-xs-12 col-sm-3 col-lg-2 clean-margin-padding">
            <Navigation auth={auth} user={user}/>
          </div>
          <div className="col-xs-12 col-sm-9 col-lg-10 ">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    user: state.user,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({signOut}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
