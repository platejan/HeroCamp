import React, {PropTypes} from 'react';

const Icon = (data) => {

  let style={
    backgroundImage: "url('"+ data.icon.toString() +"')"
  };
  if(data.size && data.size.height){
    style['minHeight'] = data.size.height;
  }
  if(data.onlyImage){
    style.marginTop = "0px";
    style.marginLeft = "0px";
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
