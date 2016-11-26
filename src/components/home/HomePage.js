import React from 'react';
import {Link} from 'react-router';
import LoginPage from '../login/LoginPage';
import checkAuth from '../requireAuth';

const HomePage = () => {
  return (
    <p>Dashboard</p>
  );
};

export default checkAuth(HomePage);
