import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetchDataFromServerApi(setMessage);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Server response: {message}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// *****************************
async function fetchDataFromServerApi(setState) {
  try {
    var res = await fetch('api');
    var { message } = await res.json();

    setState(message);
  } catch (e) {
    console.error(e);
  }
}
