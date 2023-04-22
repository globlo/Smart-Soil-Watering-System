
// import './App.css';
// import React, { useEffect, useState} from 'react'

// function App() {
//   const [backendData, setBackendData] = useState([{}])

//   useEffect(() => {
//     fetch("/getMoistures").then(
//       response => response.json()
//     ).then(
//       data => {
//         setBackendData(data)
//         // console.log(data)
//       }
//     )
//   }, [])

//   console.log(typeof backendData)
//   var moisutures = JSON.stringify(backendData)
//   console.log(typeof moisutures)
//   return (
//     <div className="App">

//       {(typeof backendData.moisuture === 'undefined') ? (
//         <p>Moisture</p>
//       ) : backendData.moisuture.map((moisuture, i) => (
//         <p key={i}>{moisuture}</p>
        
//       ))}

//       <p>{moisutures}</p>
     
      
//     </div>

  

//     // <div>heynow</div>
//   )
// }
// export default App;
import React, { useState } from 'react';
import './App.css';
import RealTimeData from './components/RealTimeData';
import HistoricalData from './components/HistoricalData';
import Controls from './components/Controls';

function App() {
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
        <RealTimeData soilMoisture={soilMoisture} pumpStatus={pumpStatus} />
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
