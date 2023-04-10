
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
      }
    )
  }, [])

  return (
    <div className="App">

      {(typeof backendData.users === 'undefined') ? (
        <p>Loading</p>
      ) : backendData.users.map((user, i) => (
        <p key={i}>{user}</p>
      ))}
      
    </div>

    // <div>heynow</div>


export default App;
