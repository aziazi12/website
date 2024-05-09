import React, { useState } from 'react';
import './Design.css';
import Table from './Table';
import { Button } from './Button';
import Recharts from './Button';
/*
const GenerationInputs = () => {
  const [generationOptions, setGenerationOptions] = useState({
    battery: false,
    diesel: false,
    solar: false,
    wind: false,
  });

  const handleGenerationOptionChange = (option) => {
    setGenerationOptions({
      ...generationOptions,
      [option]: !generationOptions[option],
    });
  };

  return (
    <div className="generation-options">
      <h1>Generation Inputs</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={generationOptions.battery}
            onChange={() => handleGenerationOptionChange('battery')}
          />
          Battery
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={generationOptions.diesel}
            onChange={() => handleGenerationOptionChange('diesel')}
          />
          Diesel
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={generationOptions.solar}
            onChange={() => handleGenerationOptionChange('solar')}
          />
          Solar
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={generationOptions.wind}
            onChange={() => handleGenerationOptionChange('wind')}
          />
          Wind
        </label>
      </div>
    </div>
  );
};
*/

const GenerationInputs = () => {
  const [generationOptions, setGenerationOptions] = useState({
    battery: false,
    diesel: false,
    solar: false,
    wind: false,
  });

  const [csvFile, setCsvFile] = useState(null);
  const [capacity, setCapacity] = useState('');
  const [solarPanelCapacity, setSolarPanelCapacity] = useState('');
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [windTurbineRatedCapacity, setWindTurbineRatedCapacity] = useState('');
  const [windTurbineRatedSpeed, setWindTurbineRatedSpeed] = useState('');
  const [windTurbineCutInSpeed, setWindTurbineCutInSpeed] = useState('');
  const [windTurbineCutOutSpeed, setWindTurbineCutOutSpeed] = useState('');
  const [dieselGeneratorConsumption, setDieselGeneratorConsumption] = useState('');
  const [dieselGeneratorCapacity, setDieselGeneratorCapacity] = useState('');

  const handleGenerationOptionChange = (option) => {
    setGenerationOptions({
      ...generationOptions,
      [option]: !generationOptions[option],
    });
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
      // You can add further processing here, such as reading the CSV file content
    }
  };

  return (
    <div className="generation-options">
      <h1>Generation Inputs</h1>
      <div className="input-container">
        <label>
          <input
            type="checkbox"
            checked={generationOptions.battery}
            onChange={() => handleGenerationOptionChange('battery')}
          />
          Battery
        </label>
      </div>
      <div className="input-container">
        <label>
          <input
            type="checkbox"
            checked={generationOptions.diesel}
            onChange={() => handleGenerationOptionChange('diesel')}
          />
          Diesel
        </label>
      </div>
      <div className="input-container">
        <label>
          <input
            type="checkbox"
            checked={generationOptions.solar}
            onChange={() => handleGenerationOptionChange('solar')}
          />
          Solar
        </label>
      </div>
      <div className="input-container">
        <label>
          <input
            type="checkbox"
            checked={generationOptions.wind}
            onChange={() => handleGenerationOptionChange('wind')}
          />
          Wind
        </label>
      </div>

      <div>
        <h2>Upload CSV File with Wind Data</h2>
        <input type="file" onChange={handleFileUpload} accept=".csv" />
      </div>

      <div>
        <h2>Upload CSV File with Solar Data</h2>
        <input type="file" onChange={handleFileUpload} accept=".csv" />
      </div>

      {/* Added space here */}
      <div style={{ margin: '20px 0' }}></div>

      <div>
        <h1>Solar</h1>

        <label htmlFor="solarPanelCapacity">What is the solar panel capacity:</label>
        <input
          type="number"
          id="solarPanelCapacity"
          placeholder="Enter capacity in watts"
          value={solarPanelCapacity}
          onChange={(e) => handleInputChange(e, setSolarPanelCapacity)}
        />
      </div>

      <div>
        <h1> Wind </h1>
        <label htmlFor="windTurbineRatedCapacity">What is the wind turbine rated capacity:</label>
        <input
          type="number"
          id="windTurbineRatedCapacity"
          placeholder="Enter capacity in watts"
          value={windTurbineRatedCapacity}
          onChange={(e) => handleInputChange(e, setWindTurbineRatedCapacity)}
        />
        <label htmlFor="windTurbineRatedSpeed">What is the wind turbine rated speed:</label>
        <input
          type="number"
          id="windTurbineRatedSpeed"
          placeholder="Enter speed in RPM"
          value={windTurbineRatedSpeed}
          onChange={(e) => handleInputChange(e, setWindTurbineRatedSpeed)}
        />
        <label htmlFor="windTurbineCutInSpeed">What is the wind turbine cut-in speed:</label>
        <input
          type="number"
          id="windTurbineCutInSpeed"
          placeholder="Enter speed in m/s"
          value={windTurbineCutInSpeed}
          onChange={(e) => handleInputChange(e, setWindTurbineCutInSpeed)}
        />
        <label htmlFor="windTurbineCutOutSpeed">What is the wind turbine cut-out speed:</label>
        <input
          type="number"
          id="windTurbineCutOutSpeed"
          placeholder="Enter speed in m/s"
          value={windTurbineCutOutSpeed}
          onChange={(e) => handleInputChange(e, setWindTurbineCutOutSpeed)}
        />
      </div>
      <div>
        <h1> Diesel </h1>       
        <label htmlFor="dieselGeneratorCapacity">What is the diesel generator capacity:</label>
        <input
          type="number"
          id="dieselGeneratorCapacity"
          placeholder="Enter capacity in watts"
          value={dieselGeneratorCapacity}
          onChange={(e) => handleInputChange(e, setDieselGeneratorCapacity)}
        />

        <label htmlFor="dieselGeneratorConsumption">What is the diesel generator consumption rate:</label>
        <input
          type="number"
          id="dieselGeneratorConsumption"
          placeholder="Enter generator consumption rate: "
          value={dieselGeneratorConsumption}
          onChange={(e) => handleInputChange(e, setDieselGeneratorConsumption)}
        />
      </div>
      <div>
        <h1>Battery</h1>

        <label htmlFor="batteryCapacity">What is the battery capacity:</label>
        <input
          type="number"
          id="batteryCapacity"
          placeholder="Enter capacity"
          value={solarPanelCapacity}
          onChange={(e) => handleInputChange(e, setBatteryCapacity)}
        />
      </div>
    </div>
  );
};


const Load = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [tables, setTables] = useState([
    { id: 1, data: Array.from({ length: 2 }, () => Array(24).fill('')) }, // Initial table
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
      // You can add further processing here, such as reading the CSV file content
    }
  };

  const handleTableDataChange = (index, newTableData) => {
    const updatedTables = [...tables];
    updatedTables[index].data = newTableData;
    setTables(updatedTables);
  };

  const handleAddTable = () => {
    const newTable = { id: tables.length + 1, data: Array.from({ length: 2 }, () => Array(24).fill('')) };
    setTables([...tables, newTable]);
  };

  const convertToCSV = () => {
    const csvContent = tables.map((table) => table.data.map((row) => row.join(',')).join('\n')).join('\n');
    downloadCSV(csvContent);
  };

  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'load_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Load Page</h1>
      <h1>--------------</h1>
      <div>
        <h3>Upload CSV File with Load Data</h3>
        <input type="file" onChange={handleFileUpload} accept=".csv" />
      </div>
      {tables.map((table, index) => (
        <div key={table.id}>
          <h3>Please enter hourly load data for load {index + 1}: </h3>
          <Table tableData={table.data} onTableDataChange={(newData) => handleTableDataChange(index, newData)} />
          <br /> {/* Add a line break after each system table */}
        </div>
      ))}
      <button onClick={handleAddTable}>Add Another Load </button>
      <button onClick={convertToCSV}>Export as CSV</button>
    </div>
  );
};


const NetEnergy = () => <h1>Net Energy Page</h1>;

const FinancialDetails = () => {
  const [initialCost, setInitialCost] = useState('');
  const [annualOperationCost, setAnnualOperationCost] = useState('');
  const [wages, setWages] = useState('');
  const [pricePerKwh, setPricePerKwh] = useState('');
  const [costToReplaceRotor, setCostToReplaceRotor] = useState('');
  const [costToRepairRotor, setCostToRepairRotor] = useState('');
  const [yearsOfOperation, setYearsOfOperation] = useState('');
  const [bladeReplacementInterval, setBladeReplacementInterval] = useState('');
  const [rotorReplacementInterval, setRotorReplacementInterval] = useState('');

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="financial-details">
      <h1>Financial Details Page</h1>
      <div>
        <label htmlFor="initialCost">Initial Cost:</label>
        <input
          type="number"
          id="initialCost"
          placeholder="Enter initial cost"
          value={initialCost}
          onChange={(e) => handleInputChange(e, setInitialCost)}
        />
      </div>
      <div>
        <label htmlFor="annualOperationCost">Annual Operation Cost:</label>
        <input
          type="number"
          id="annualOperationCost"
          placeholder="Enter annual operation cost"
          value={annualOperationCost}
          onChange={(e) => handleInputChange(e, setAnnualOperationCost)}
        />
      </div>
      <div>
        <label htmlFor="wages">Wages:</label>
        <input
          type="number"
          id="wages"
          placeholder="Enter wages"
          value={wages}
          onChange={(e) => handleInputChange(e, setWages)}
        />
      </div>
      <div>
        <label htmlFor="pricePerKwh">Price per kWh:</label>
        <input
          type="number"
          id="pricePerKwh"
          placeholder="Enter price per kWh"
          value={pricePerKwh}
          onChange={(e) => handleInputChange(e, setPricePerKwh)}
        />
      </div>
      <div>
        <label htmlFor="costToReplaceRotor">Cost to Replace Rotor:</label>
        <input
          type="number"
          id="costToReplaceRotor"
          placeholder="Enter cost to replace rotor"
          value={costToReplaceRotor}
          onChange={(e) => handleInputChange(e, setCostToReplaceRotor)}
        />
      </div>
      <div>
        <label htmlFor="costToRepairRotor">Cost to Repair Rotor:</label>
        <input
          type="number"
          id="costToRepairRotor"
          placeholder="Enter cost to repair rotor"
          value={costToRepairRotor}
          onChange={(e) => handleInputChange(e, setCostToRepairRotor)}
        />
      </div>
      <div>
        <label htmlFor="yearsOfOperation">Years of Operation:</label>
        <input
          type="number"
          id="yearsOfOperation"
          placeholder="Enter years of operation"
          value={yearsOfOperation}
          onChange={(e) => handleInputChange(e, setYearsOfOperation)}
        />
      </div>
      <div>
        <label htmlFor="bladeReplacementInterval">Blade Replacement Interval:</label>
        <input
          type="number"
          id="bladeReplacementInterval"
          placeholder="Enter blade replacement interval"
          value={bladeReplacementInterval}
          onChange={(e) => handleInputChange(e, setBladeReplacementInterval)}
        />
      </div>
      <div>
        <label htmlFor="rotorReplacementInterval">Rotor Replacement Interval:</label>
        <input
          type="number"
          id="rotorReplacementInterval"
          placeholder="Enter rotor replacement interval"
          value={rotorReplacementInterval}
          onChange={(e) => handleInputChange(e, setRotorReplacementInterval)}
        />
      </div>
    </div>
  );
};

const Design = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSidebarOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleSidebarOptionClick('generationInputs')}>Generation Inputs</li>
          <li onClick={() => handleSidebarOptionClick('load')}>Load</li>
          <li onClick={() => handleSidebarOptionClick('netEnergy')}>Net Energy</li>
          <li onClick={() => handleSidebarOptionClick('financialDetails ')}>Financial Details </li>
        </ul>
      </div>
      <div className="content">
        {selectedOption === 'generationInputs' && <GenerationInputs />}
        {selectedOption === 'load' && <Load />}
        {selectedOption === 'netEnergy' && <NetEnergy />}
        {selectedOption === 'financialDetails ' && <FinancialDetails />}
      </div>
    </div>
  );
};

export default Design;
