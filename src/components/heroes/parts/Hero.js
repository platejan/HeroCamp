import React, {PropTypes} from 'react';

const Hero = ({ItemKey, ItemName, ItemDescription}) => {
  let click = ()=>{
    alert("click!");
  };
  return (
    <div className="row" id={ItemKey}>
      <a className="col-xs-12 hero-top" onClick={click}>{ItemName}</a>
      <div className="col-xs-12 hero-detail">
        <h2>{ItemName}</h2>
        <p>{ItemDescription}</p>
      </div>
    </div>
  );
};

Hero.propTypes = {
  ItemKey: PropTypes.string.isRequired,
  ItemName: PropTypes.string.isRequired,
  ItemDescription: PropTypes.string.isRequired
};

export default Hero;
