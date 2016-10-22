import React, {PropTypes} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import LoadingDots from './LoadingDots';
import {DropdownButton, MenuItem} from 'react-bootstrap';

const UserMenu = ({loading, signOut, auth, user}) => {

  if (auth.isLogged) {
    let username= user.email;

    return (
      <div className="usermenu-part col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-push-9 col-md-push-9 col-lg-push-9">
        <div className="dropdown text-right">
          <DropdownButton title={username} pullRight id="usermenu">
            <MenuItem eventKey="1"><span className="glyphicon glyphicon-user"></span> <span>Profile</span></MenuItem>
            <MenuItem eventKey="2"><span className="glyphicon glyphicon-cog"></span> <span>Settings</span></MenuItem>
            <MenuItem divider/>
            <LinkContainer to="/heroes">
              <MenuItem eventKey="3"><span className="glyphicon glyphicon-tent"></span> <span>Heroes</span></MenuItem>
            </LinkContainer>
            <MenuItem eventKey="3"><span className="glyphicon glyphicon-star"></span> <span>Bookmarks</span></MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey="4" onClick={signOut}><span className="glyphicon glyphicon-log-out"></span>
              <span>Log out</span></MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="usermenu-part col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-push-9 col-md-push-9 col-lg-push-9"></div>
    );
  }
};

UserMenu.propTypes = {
  signOut: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default UserMenu;
