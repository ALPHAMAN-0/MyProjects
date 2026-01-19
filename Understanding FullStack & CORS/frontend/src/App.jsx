import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';

import './App.css'
import { useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <>
      <h1>Hello from the frontend!</h1>
      <p></p>
      {
        data.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.id}</h2>
              <p>{item.name}</p>
            </div>
          );
        })
      }
    </>
  )
}

export default App
