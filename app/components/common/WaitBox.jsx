import React from 'react';

//waiting indicator (based on SpinKit CSS animations)
const WaitBox = () => (
  <div className="sk-three-bounce wait-box">
    <div className="sk-child sk-bounce1"/>
    <div className="sk-child sk-bounce2"/>
    <div className="sk-child sk-bounce3"/>
  </div>
);

export default WaitBox;
