import React from 'react';
import Header from './common/Header';
import UserMenu from './common/UserMenu'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../actions/authActions';
var Breadcrumbs = require('react-breadcrumbs');

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {auth, actions, loading, user} = this.props;
    const style = {
      width: '100%',
      padding: '0',
      margin: '0'
    };

    return (
      <div className="container" style={style}>
        <div className="row">
          <Header/>
          <UserMenu signOut={actions.signOut} auth={auth} loading={loading} user={user}/>
          <div
            className="navigation-part col-xs-12 col-sm-9 col-md-9 col-lg-9 col-sm-pull-3 col-md-pull-3 col-lg-pull-3">
            <Breadcrumbs
              separator=""
              wrapperElement="ol" itemElement="li"
              wrapperClass="header-navigation breadcrumb"
              routes={this.props.routes}
              params={this.props.params}
            />
          </div>
        </div>
        {this.props.children}
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
