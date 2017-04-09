import React, {PropTypes} from 'react';

const Icon = (data) => {

  let style={
    backgroundImage: "url('"+ data.icon.toString() +"')"
  };
  if(data.size && data.size.height){
    style['minHeight'] = data.size.height;
  }
  if(data.onlyImage || data.withoutMargins){
    style.marginTop = "0px";
    style.marginLeft = "0px";
  }
  if(data.withoutRoundCorners){
    style.borderTopLeftRadius = "0";
    style.borderBottomLeftRadius = "0";
  }
  return (
    <div className="hero-bio-icon-part" style={style}>
    </div>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
