import React, {PropTypes} from 'react';

const Icon = (icon) => {
  const style={
    backgroundImage: "url('"+ icon.icon.toString() +"')"
  };
  return (
    <div className="hero-bio-icon-part" style={style}>
    </div>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
