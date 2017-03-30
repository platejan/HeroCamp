import React, {PropTypes} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoadingDots from './LoadingDots';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {signOut} from '../../actions/authActions';
import {setUsername,loadUsername} from  '../../actions/userActions';
import toastr from 'toastr';

class UserMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state={
      usernameDefined: false
    }
  }

  componentWillReceiveProps() {
    if(this.props.authenticated){
    let username = this.props.displayName;
    if ((!username || username == "")&& this.props.displayNameLoaded && !this.state.usernameDefined) {
      this.setState({usernameDefined:true});
      while (!username || username == "") {
        username = prompt("Please enter your username", this.props.email);
      }
      this.props.actions.setUsername(username, (error = null)=> {
        if (error == null) {
          toastr.success("Username is set.");
        } else {
          toastr.error(error);
        }
      });
    }
    }
  }

  render() {
    if (this.props.authenticated) {
      let username = this.props.displayName;

      /*
       <MenuItem eventKey="1"><span className="glyphicon glyphicon-user"></span> <span>Profile</span></MenuItem>
       <MenuItem eventKey="2"><span className="glyphicon glyphicon-cog"></span> <span>Settings</span></MenuItem>
       <MenuItem divider/>
       <MenuItem eventKey="3"><span className="glyphicon glyphicon-star"></span> <span>Bookmarks</span></MenuItem>
       */
      return (
        <div className="usermenu-part col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-push-9 col-md-push-9 col-lg-push-9">
          <div className="dropdown text-right">
            <DropdownButton title={username} pullRight id="usermenu">

              <LinkContainer to="/messages">
                <MenuItem eventKey="2"><span className="glyphicon glyphicon-envelope"></span> <span>Messages</span></MenuItem>
              </LinkContainer>
              <MenuItem divider/>
              <LinkContainer to="/heroes">
                <MenuItem eventKey="3"><span className="glyphicon glyphicon-tent"></span> <span>Heroes</span></MenuItem>
              </LinkContainer>
              <LinkContainer to="/stories">
                <MenuItem eventKey="3"><span className="glyphicon glyphicon-book"></span> <span>Stories</span></MenuItem>
              </LinkContainer>
              <MenuItem divider/>
              <LinkContainer to="/rulespage">
              <MenuItem eventKey="4"><span className="glyphicon glyphicon-star"></span> <span>Rules maker</span></MenuItem>
              </LinkContainer>
              <MenuItem divider/>
              <MenuItem eventKey="5" onClick={this.props.actions.signOut}><span
                className="glyphicon glyphicon-log-out"></span> <span>Log out</span></MenuItem>
            </DropdownButton>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="usermenu-part col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-push-9 col-md-push-9 col-lg-push-9"></div>
      );
    }
  }
}

UserMenu.propTypes = {
  signOut: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};
function mapStateToProps(state, ownProps) {
  return {
    authenticated: state.auth.isLogged,
    email: state.user.email,
    displayName: state.user.displayName,
    displayNameLoaded: state.user.displayNameLoaded
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({signOut, setUsername,loadUsername}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
