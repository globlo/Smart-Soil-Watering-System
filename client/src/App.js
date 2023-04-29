
import './App.css';

import React, { useState, useEffect } from "react";

function App() {

  const [humidityValue, setHumidityValue] = useState(0); // data = 0; setData() is a method  // state is built-in React object that is used to contain data
  const [presetValue, setPresetValue] = useState(50);

  useEffect(() => {
    fetch("/getMoisture")
      .then(res => res.json())
      .then(res_json => {
        setHumidityValue(res_json.humidity);
        setPresetValue(res_json.preset);
      })
      .catch(error => console.error(error));
  }, []);
   
  console.count(humidityValue);

  const sendPreset = (presetVal) =>{
    // console.count(presetValue)
    fetch('/sendPreset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        presetVal: presetVal
      })
    })
      .then(res => res.json())
      .then(res_json => {
        setHumidityValue(res_json.humidity);
        setPresetValue(res_json.preset);
      })
      .catch(error => console.error(error));

  };

  return (

    <div className="App">

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      
      <body class="box">
        <div class="container is-fullhd">

          <div class="notification is-dark">
            <h1 class="title is-1 has-text-light" >Smart Soil Watering System</h1>
          </div>
         
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <div class="title">Humidity: <span><p class="tag is-link is-large">{humidityValue}%</p></span></div>
            </div>
            <div class="control">
              <div class="title">Preset: <span><p class="tag is-primary is-large">{presetValue}%</p></span></div>
            </div>
          </div>
          
          <div class="field is-grouped is-grouped-centered"> 
            <progress class="progress is-link" value={parseInt(humidityValue)} max="100"></progress>
          </div>

          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <div class="title">Set humidity(%):</div>  
            </div>
            <div class="control">
              <input class="input" type="text" placeholder="Enter value" onChange={(e) => setPresetValue(e.target.value)}/>
            </div>
            <div class="control">
              <button class="button is-primary" onClick={() => sendPreset(presetValue)}>Set</button>
            </div>
          </div>

        </div>
      </body>

    </div>

  );
}

export default App;
