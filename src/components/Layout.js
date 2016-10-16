import React from 'react';
import Header from './common/Header';
import UserMenu from './common/UserMenu'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../actions/authActions';

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
