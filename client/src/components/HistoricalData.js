import React from 'react';

const HistoricalData = ({ history }) => {
  return (
    <div className="historical-data">
      <h2>Watering History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Soil Moisture</th>
            <th>Water Pump Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.soilMoisture}%</td>
              <td>{entry.pumpStatus ? 'ON' : 'OFF'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalData;
