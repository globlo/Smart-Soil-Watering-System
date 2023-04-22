
import './App.css';
import React, { useState, useEffect } from "react";
import RealTimeData from './components/RealTimeData';
import HistoricalData from './components/HistoricalData';
import Controls from './components/Controls';

function App() {

  const [data, setData] = useState([]);
  // 
  useEffect(() => {
    fetch("/getMoisture")
      .then(res => res.json())
      .then(res_json => setData(res_json))
      .catch(() => console.log("error"));
  }, []);
   
  console.log(data);

  // Replace these with actual data fetched from your backend.
  const [soilMoisture, setSoilMoisture] = useState(50);
  const [pumpStatus, setPumpStatus] = useState(false);
  const [history, setHistory] = useState([]);

  const togglePump = () => {
    setPumpStatus(!pumpStatus);
    // Call your backend API to toggle the pump status.
  };

  const changeThreshold = (newThreshold) => {
    // Call your backend API to update the soil moisture threshold.
  };

  const changeSchedule = (newSchedule) => {
    // Call your backend API to update the watering schedule.
  };

  return (
    <div className="App">

      <header className="App-header">
        <h1>Soil Watering System</h1>
      </header>
      <main>
        <RealTimeData soilMoisture={data.humidity} pumpStatus={pumpStatus} />
        <HistoricalData history={history} />
        <Controls
          onTogglePump={togglePump}
          onChangeThreshold={changeThreshold}
          onChangeSchedule={changeSchedule}
        />
      </main>

    </div>
    
    
  );
}

export default App;
