import React from 'react';
//import logo from '../../images/herocamp_logo.svg';
var logo = require('../../images/herocamp_logo.svg');

const Header = () => {

  return (
    <div className="header-part">
      <h1>HeroCamp project</h1>
      <img src={logo} />
    </div>
  );
};
export default Header;
