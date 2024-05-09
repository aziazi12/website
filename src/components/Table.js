import React, { useState } from 'react';
import './Table.css';

const Table = ({ tableData, onTableDataChange }) => {
  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][colIndex] = value;
    onTableDataChange(updatedData);
  };

  return (
    <table border="1" style={{ textAlign: 'center' }}>
      <tbody>
        <tr>
          {Array.from({ length: 24 }, (_, index) => (
            <td key={index}>{index}</td>
          ))}
        </tr>
        <tr>
          {tableData[0].map((cell, colIndex) => (
            <td key={`input-${colIndex}`}>
              <input
                type="text"
                value={cell}
                onChange={(e) => handleCellChange(0, colIndex, e.target.value)}
                style={{ textAlign: 'center' }} // Center align the input text
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table; // Export Table component as default
