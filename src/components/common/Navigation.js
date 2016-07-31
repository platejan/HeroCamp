import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import AdminLink from './AdminLink';

const Navigation = ({auth, user}) => {

  let adminLink = user.isAdmin ? <AdminLink /> : null;

  return (
    <nav className="navigation-left">
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      <Link to="/about" activeClassName="active">About</Link>
      <Link to="/chapters" activeClassName="active">Chapters</Link>
      <Link to="/heroes" activeClassName="active">Heroes</Link>
      <Link to="/protected" activeClassName="active">Protected</Link>
      {adminLink}
    </nav>
  );
};

Navigation.propTypes = {
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

export default Navigation;
