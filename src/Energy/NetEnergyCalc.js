// NetEnergyCalc.js
import React, { useState } from 'react';
import './NetEnergyCalc.css';

const NetEnergyCalc = () => {
  const [cutInSpeed, setCutInSpeed] = useState('');
  const [ratedSpeed, setRatedSpeed] = useState('');
  const [cutOutSpeed, setCutOutSpeed] = useState('');
  const [ratedPower, setRatedPower] = useState('');
  const [energyType, setEnergyType] = useState('Wind'); // Default energy type is Wind
  const [netEnergy, setNetEnergy] = useState(null);

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    // Can add validation or additional logic as needed
    setter(value);
  };

  const handleButtonClick = (setter) => {
    // Can add additional logic or actions when a button is clicked
    console.log(`Button for ${setter} clicked`);
  };

  const handleEnergyTypeChange = (e) => {
    setEnergyType(e.target.value);
    // Reset net energy when energy type changes
    setNetEnergy(null);
  };

  const calculateNetEnergy = () => {
    // Perform calculation for wind energy type
    if (energyType === 'Wind') {
      // For development purposes, let's assume a simple calculation:
      // Net Energy = Rated Power * (Rated Speed - Cut In Speed)
      const netEnergyValue = ratedPower * (ratedSpeed - cutInSpeed);
      setNetEnergy(netEnergyValue);
    } else if (energyType === 'Solar') {
      // Perform calculation for solar energy type
      // Add specific calculation logic for solar energy here
      // For development purposes, I set the net energy to a default value
      const defaultNetEnergyValue = 500; // kWh
      setNetEnergy(defaultNetEnergyValue);
    }
  };

  const renderPrompts = () => {
    if (energyType === 'Wind') {
      return (
        <div>
          <div>
            <label htmlFor="cutInSpeed">Cut In Speed:</label>
            <input
              type="text"
              id="cutInSpeed"
              value={cutInSpeed}
              onChange={(e) => handleInputChange(e, setCutInSpeed)}
            />
          </div>
          <div>
            <label htmlFor="ratedSpeed">Rated Speed:</label>
            <input
              type="text"
              id="ratedSpeed"
              value={ratedSpeed}
              onChange={(e) => handleInputChange(e, setRatedSpeed)}
            />
          </div>
          <div>
            <label htmlFor="cutOutSpeed">Cut Out Speed:</label>
            <input
              type="text"
              id="cutOutSpeed"
              value={cutOutSpeed}
              onChange={(e) => handleInputChange(e, setCutOutSpeed)}
            />
          </div>
          <div>
            <label htmlFor="ratedPower">Rated Power:</label>
            <input
              type="text"
              id="ratedPower"
              value={ratedPower}
              onChange={(e) => handleInputChange(e, setRatedPower)}
            />
          </div>
        </div>
      );
    } else if (energyType === 'Solar') {
      return (
        <div>
          {/* Render prompts specific to Solar energy type */}
          {/* Add additional prompts as needed */}
          <div>
            <label htmlFor="solarPanelArea">Solar Panel Area:</label>
            <input
              type="text"
              id="solarPanelArea"
              value={cutInSpeed}
              onChange={(e) => handleInputChange(e, setCutInSpeed)}
            />
          </div>
          <div>
            <label htmlFor="solarPanelEfficiency">Solar Panel Efficiency:</label>
            <input
              type="text"
              id="solarPanelEfficiency"
              value={ratedSpeed}
              onChange={(e) => handleInputChange(e, setRatedSpeed)}
            />
          </div>
          {/* Add more prompts for solar energy type as needed */}
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Net Energy Calculator</h1>
      <div className="input-container">
        <label htmlFor="energyType">Energy Type:</label>
        <select id="energyType" value={energyType} onChange={handleEnergyTypeChange}>
          <option value="Wind">Wind</option>
          <option value="Solar">Solar</option>
          <option value="Battery">Battery</option>
          <option value="Diesel">Diesel</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {renderPrompts()}
      <div>
        <button onClick={() => calculateNetEnergy()}>Calculate Net Energy</button>
      </div>
      {netEnergy !== null && (
        <div>
          <h2>Net Energy:</h2>
          <p>{netEnergy} kWh</p>
        </div>
      )}
    </div>
  );
};

export default NetEnergyCalc;
