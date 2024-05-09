import React, { useState } from 'react';
import './Inputs.css';

const Inputs = () => {
  const [totalLoad, setTotalLoad] = useState('');
  const [generation, setGeneration] = useState('');
  const [loadType, setLoadType] = useState('default');
  const [netLoad, setNetLoad] = useState('');

  const calculateNetLoad = () => {
    if (totalLoad && generation) {
      const netLoadValue = totalLoad - generation;
      setNetLoad(netLoadValue);
    }
  };

  const handleLoadTypeChange = (e) => {
    setLoadType(e.target.value);
  };

  const handleReset = () => {
    setTotalLoad('');
    setGeneration('');
    setLoadType('default');
    setNetLoad('');
  };

  return (
    <div className="net-load-calculator">
      <h2>Net Load Calculator</h2>
      <div className="input-container">
        <label htmlFor="loadType">Select Load Type:</label>
        <select id="loadType" value={loadType} onChange={handleLoadTypeChange}>
          <option value="default" disabled>Select Load Type</option>
          <option value="type1">Solar</option>
          <option value="type2">Wind</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="totalLoad">Total Load (MW):</label>
        <input
          type="number"
          id="totalLoad"
          value={totalLoad}
          onChange={(e) => setTotalLoad(parseFloat(e.target.value))}
        />
      </div>
      <div className="input-container">
        <label htmlFor="generation">Generation (MW):</label>
        <input
          type="number"
          id="generation"
          value={generation}
          onChange={(e) => setGeneration(parseFloat(e.target.value))}
        />
      </div>
      <div className="button-container">
        <button onClick={calculateNetLoad}>Calculate Net Load</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {netLoad !== '' && (
        <div className="result-container">
          <h3>Net Load:</h3>
          <p>{netLoad} MW</p>
        </div>
      )}
    </div>
  );
};

export default Inputs;
