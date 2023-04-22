
import './App.css';
import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState(undefined);
  // ここを修正
  useEffect(() => {
    fetch("/getMoisture")
      .then(res => res.json())
      .then(res_json => setData(res_json))
      .catch(() => console.log("error"));
  }, []);
   
  console.log(data);

  return (
    <div className="App">
      
      {data === undefined ? "" : <div>{data.humidity}</div>}

    </div>
  );
}

export default App;
