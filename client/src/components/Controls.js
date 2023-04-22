import React from 'react';

const Controls = ({ onTogglePump, onChangeThreshold, onChangeSchedule }) => {
  const handleThresholdChange = (e) => {
    onChangeThreshold(e.target.value);
  };

  const handleScheduleChange = (e) => {
    onChangeSchedule(e.target.value);
  };

  return (
    <div className="controls">
      <h2>Controls</h2>
      <button onClick={onTogglePump}>Toggle Water Pump</button>
      <div>
        <label htmlFor="threshold">Soil Moisture Threshold: </label>
        <input
          type="number"
          id="threshold"
          min="0"
          max="100"
          onChange={handleThresholdChange}
        />
      </div>
      <div>
        <label htmlFor="schedule">Watering Schedule (in minutes): </label>
        <input
          type="number"
          id="schedule"
          min="1"
          onChange={handleScheduleChange}
        />
      </div>
    </div>
  );
};

export default Controls;
