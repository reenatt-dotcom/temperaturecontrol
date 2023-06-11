import React from 'react';

const TemperatureControls = ({ incrementTemperature, decrementTemperature }) => {
  return (
    <div className="temperature-controls">
      <button onClick={decrementTemperature}>-</button>
      <button onClick={incrementTemperature}>+</button>
    </div>
  );
};

export default TemperatureControls;
