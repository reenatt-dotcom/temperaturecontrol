import React, { useState, useEffect } from 'react';
import TemperatureDisplay from './TemperatureDisplay';
import TemperatureControls from './TemperatureControls';
import './App.css'


const App = () => {
  const [temperature, setTemperature] = useState(20); // Initial temperature value
  const [textColor, setTextColor] = useState('#000000'); // Initial text color (black)

  const incrementTemperature = () => {
    setTemperature(temperature + 1);
  };

  const decrementTemperature = () => {
    setTemperature(temperature - 1);
  };

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

  const calculateTextColor = (background) => {
    const luminance = (0.299 * background.r + 0.587 * background.g + 0.114 * background.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff'; // Use black text for light backgrounds and white text for dark backgrounds
  };

  useEffect(() => {
    const backgroundRgb = getBackgroundColor()
      .substring(4, getBackgroundColor().length - 1)
      .replace(/ /g, '')
      .split(',');

    const background = {
      r: parseInt(backgroundRgb[0]),
      g: parseInt(backgroundRgb[1]),
      b: parseInt(backgroundRgb[2])
    };

    const textColor = calculateTextColor(background);
    setTextColor(textColor);
  }, [temperature]);

  // Apply background color and text color to the body element
  document.body.style.backgroundColor = getBackgroundColor();
  document.body.style.color = textColor;

  return (
    <div className="app">
      <h1>Temperature Control App</h1>
      <TemperatureDisplay temperature={temperature} />
      <TemperatureControls
        incrementTemperature={incrementTemperature}
        decrementTemperature={decrementTemperature}
      />
    </div>
  );
};

export default App;
