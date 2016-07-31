import React from 'react';
import {Link} from 'react-router';

const LoginLink = () => {
  return (
    <div>
      <Link to="/register" activeClassName="active">Sign Up</Link>
      <Link to="/login" activeClassName="active">Login</Link>
      </div>
  );
};

export default LoginLink;
