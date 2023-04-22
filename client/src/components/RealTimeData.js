import React from 'react';

const RealTimeData = ({ soilMoisture, pumpStatus }) => {
  return (
    <div className="real-time-data">
      <h2>Real-Time Data</h2>
      <p>Soil Moisture: {soilMoisture}%</p>
      <p>Water Pump Status: {pumpStatus ? 'ON' : 'OFF'}</p>
    </div>
  );
};

export default RealTimeData;
