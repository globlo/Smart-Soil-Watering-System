
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

  async function sendPreset(val) {
    

    await fetch('/sendPreset', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          presetVal: val
        })
      })
        .then(res => res.json())
        .then(res_json => {
          setHumidityValue(res_json.humidity);
          setPresetValue(res_json.preset);
        })
        .catch(error => console.error(error));

  };

  const [tempColor, setTempColor] = useState("dry");

  async function increaseTemp() {
    setPresetValue(presetValue + 1);
    sendPreset(presetValue + 1)
    
    console.log(presetValue)

    if (presetValue === 100) {
      return setPresetValue(presetValue);
    }

  };

  async function decreaseTemp () {
    setPresetValue(presetValue - 1);
    sendPreset(presetValue - 1)

    console.log(presetValue)

    if (presetValue === 0) {
      return setPresetValue(presetValue);
    }

    if (presetValue <= 50) {
      return setTempColor("dry");
    }
  };

  return (

    <div className="App">

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      
      <body class="box has-background-grey-lighter">
        <div class="container is-fullhd">


          <section class="box has-background-dark">
            <div class="container is-fullhd">
              <h1 class="title is-1 has-text-link" >Smart Soil Watering System</h1>
            </div>
          </section>
      
          <section class="table has-background-grey-lighter">
            <tr>
              <th>
                <div class="field is-grouped is-grouped-centered">
                  <div class="box has-background-dark">
                    <div class="container is-fullhd">

                      <div class="title has-text-white">HUMIDITY: <span><p class="tag is-link is-large">{humidityValue}%</p></span></div>
                      <progress class="progress is-link" value={parseInt(humidityValue)} max="100"></progress>

                    </div>
                  </div>
                </div>
              </th>
              <th>
                <div class="field is-grouped is-grouped-centered">
                  <div class="box has-background-dark">
                    <div class="container is-fullhd">
                      <div class="title has-text-white">PRESET</div>
                      <div className="app-container">
                        <div className="temperature-display-container">
                          <div className="temperature-display">{presetValue}%</div>
                        </div>
                        <div className="button-container">
                          <button onClick={increaseTemp}>+</button>
                          <button onClick={decreaseTemp}>-</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </section>
            
        </div>
        

      </body>
    </div>

  );
}

export default App;
