import React from 'react';

const Overlay = ({click,child,display}) => {
  let className = "";
  if(display){
    className = "overlay-part";
  }else{
    className = "overlay-part dont-show";
  }

  return (
    <div onClick={click} className={className}>
      <child/>
    </div>
  );
};

export default Overlay;
