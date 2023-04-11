
import './App.css';
import React, { useEffect, useState} from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/getMoistures").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
        // console.log(data)
      }
    )
  }, [])

  console.log(typeof backendData)
  var moisutures = JSON.stringify(backendData)
  console.log(typeof moisutures)
  return (
    <div className="App">

      {(typeof backendData.moisuture === 'undefined') ? (
        <p>Moisture</p>
      ) : backendData.moisuture.map((moisuture, i) => (
        <p key={i}>{moisuture}</p>
        
      ))}

      <p>{moisutures}</p>
     
      
    </div>

  

    // <div>heynow</div>
  )
}
export default App;
