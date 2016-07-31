import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import AdminLink from './AdminLink';

const Navigation = ({auth, user}) => {

  let adminLink = user.isAdmin ? <AdminLink /> : null;
  let heroesLink = auth.isLogged ? <Link to="/heroes" activeClassName="active">Heroes</Link>: null;
  let storiesLink = auth.isLoggrd ? <Link to="/stories" activeClassName="active">Stories</Link>: null;

  return (
    <nav className="navigation-left">
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      <Link to="/about" activeClassName="active">About</Link>
      {heroesLink}
      {storiesLink}
      {adminLink}
    </nav>
  );
};

Navigation.propTypes = {
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

export default Navigation;
