
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

  };

  return (

    <div className="App">

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      
      <div className="box has-background-grey-lighter">

        <section className="box has-background-dark">
          <div className="container is-fullhd">
            <h1 className="title is-1 has-text-link" >Smart Soil Watering System</h1>
          </div>
        </section>

        <div className="columns is-multiline is-mobile">
          
          <div className="column">
            <div className="box has-background-dark">

              <h2 className="title has-text-white">HUMIDITY: <span><p className="tag is-link is-large">{humidityValue}%</p></span></h2>
              <progress className="progress is-link" value={parseInt(humidityValue)} max="100"></progress>

            </div>
          </div>

          <div className="column">
            <div className="box has-background-dark">

              <h3 className="title has-text-white preset">PRESET</h3>

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
    </div>

  );
}

export default App;
