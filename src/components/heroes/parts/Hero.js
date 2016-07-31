import React, {PropTypes} from 'react';

const Hero = ({ItemKey, ItemName}) => {
  return (
    <li id={ItemKey}>{ItemName}</li>
  );
};

Hero.propTypes = {
  ItemKey: PropTypes.string.isRequired,
  ItemName: PropTypes.string.isRequired
};

export default Hero;
