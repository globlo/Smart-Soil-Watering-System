
import './App.css';

import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState(0); // data = 0; setData() is a method  // state is built-in React object that is used to contain data
  // 
  useEffect(() => {
    fetch("/getMoisture")
      .then(res => res.json())
      .then(res_json => setData(res_json))
      .catch(() => console.log("error"));
  }, []);
   
  console.count(data.humidity);

  return (

    <div className="App">

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      
      <body class="box">
        <div class="container is-fullhd">

          <div class="notification is-dark">

            <h1 class="title is-1 has-text-light" >Smart Soil Watering System</h1>

          </div>
          <div>

            <div class="title">Humidity: <span class="tag is-link is-large">{data.humidity}%</span> </div>
            <progress class="progress is-link" value={parseInt(data.humidity)} max="100"></progress>
            
          </div>

        </div>
      </body>

    </div>

  );
}

export default App;
