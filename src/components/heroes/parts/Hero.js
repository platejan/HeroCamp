import React, {PropTypes} from 'react';

const Hero = ({itemKey,itemContent}) => {
  console.log(itemContent);
  return (
    <div className="hero-part col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <div className="col-xs-12">
        <div className="hero-bio-icon-part">
        </div>
        <div className="hero-bio-part">
          <span className="info-label">Name:</span>
          <span className="">{itemContent.name}</span>
          <span className="info-label">Species:</span>
          <span className="">--</span>
          <span className="info-label">Age:</span>
          <span className="">--</span>
        </div>
        <div className="hero-bio-flag-part">
          <span>in game</span>
        </div>
        <div className="hero-bio-tools-part">
          <span className="glyphicon glyphicon-pencil"></span>
        </div>
      </div>
      <
    </div>
  );
};

Hero.propTypes={
  itemContent: PropTypes.object.isRequired,
  itemKey: PropTypes.string.isRequired
};

export default Hero;
