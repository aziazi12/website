import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Results.css';

const SystemDefinition = () => <h2>Load Variations Page</h2>;

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
      <h2>Storage Results</h2>
    </div>
  );
};

const Simulation = () => {
  // Chart initialization for solar data
  useEffect(() => {
    const solarCtx = document.getElementById('solarChart');
    new Chart(solarCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Solar Data',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, []);

  // Chart initialization for wind data
  useEffect(() => {
    const windCtx = document.getElementById('windChart');
    new Chart(windCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Wind Data',
          data: [30, 40, 25, 50, 45, 35, 55],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, []);

  return (
    <div>
      <h2>Simulation Page</h2>
      {/* Solar Chart */}
      <div className="graph-container">
        <canvas id="solarChart" width="400" height="400"></canvas>
      </div>
      {/* Wind Chart */}
      <div className="graph-container">
        <canvas id="windChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
};

const Breakage = () => {
  // Chart initialization
  useEffect(() => {
    const ctx = document.getElementById('breakageChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Component 1', 'Component 2', 'Component 3', 'Component 4', 'Component 5'],
        datasets: [{
          label: 'Breakage Level',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, []);

  return (
    <div>
      <h1>Breakage</h1>
      {/* Chart */}
      <div className="graph-container">
        <canvas id="breakageChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
};

const FinancialDetails = () => {
  return (
    <div>
      <h1>Financial Details</h1>
      <h1> ----------------------</h1>
      <div className="financial-details-container">
        <div className="financial-block">
          <h3>Costs & Revenue</h3>
          <p>-- Costs & revenue results go here</p>
        </div>
        <div className="financial-block">
          <h3>Net Load Calculation</h3>
          <p>-- net load calculation information goes here</p>
        </div>
        <div className="financial-block">
          <h3>Net Present Value</h3>
          <p>-- net present value information goes here</p>
        </div>
        <div className="financial-block">
          <h3>Expected Financial Support</h3>
          <p> -- expected financial support information goes here</p>
          <p>    </p>
        </div>
        <div className="financial-block">
          <h3>Expected Impact Calculations</h3>
          <p>-- expected impact calculations information goes here</p>
        </div>
      </div>
      {/* Add a space */}
      <div style={{ marginBottom: '20px' }}></div>
    </div>
  );
};

const NetLoadCalculator = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSidebarOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleSidebarOptionClick('systemDefinition')}>Load Variations</li>
          <li onClick={() => handleSidebarOptionClick('generationInputs')}>Storage Results</li>
          <li onClick={() => handleSidebarOptionClick('simulation')}>Curtailment Graphs</li>
          <li onClick={() => handleSidebarOptionClick('breakage')}>Breakage</li>
          <li onClick={() => handleSidebarOptionClick('financialDetails')}>Financial Results</li>
        </ul>
      </div>
      <div className="content">
        {selectedOption === 'systemDefinition' && <SystemDefinition />}
        {selectedOption === 'generationInputs' && <GenerationInputs />}
        {selectedOption === 'breakage' && <Breakage />}
        {selectedOption === 'simulation' && <Simulation />}
        {selectedOption === 'financialDetails' && <FinancialDetails />}
      </div>
    </div>
  );
};

export default NetLoadCalculator;
