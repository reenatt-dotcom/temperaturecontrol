import React from 'react';

const TemperatureDisplay = ({ temperature }) => {
  const getBackgroundColor = () => {
    const colorTemperature = mapTemperatureToColor(temperature);
    return getColorFromTemperature(colorTemperature);
  };

  const mapTemperatureToColor = (temperature) => {
    // Map temperature to a range suitable for color calculation
    const minTemperature = -20;
    const maxTemperature = 40;
    const normalizedTemperature = (temperature - minTemperature) / (maxTemperature - minTemperature);
    const colorTemperature = 1 - normalizedTemperature; // Invert to match color scale

    return colorTemperature;
  };

  const getColorFromTemperature = (colorTemperature) => {
    // Calculate color based on color temperature
    const red = Math.floor(255 * colorTemperature);
    const green = Math.floor(255 * colorTemperature * 0.7);
    const blue = Math.floor(255 * colorTemperature * 0.4);

    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <div className="temperature-display" style={{ backgroundColor: getBackgroundColor() }}>
      <h2>Current Temperature: {temperature}°C</h2>
    </div>
  );
};

export default TemperatureDisplay;
