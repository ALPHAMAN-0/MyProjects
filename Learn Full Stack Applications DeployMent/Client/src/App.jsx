import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3001/api/message")
      .then((res) => {
        // Check if response is OK
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        // Check if response is JSON
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          return res.json()
        } else {
          throw new Error('Response is not JSON')
        }
      })
      .then((data) => {
        setMessage(data.message) // Access the 'message' property
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <h1>Hello World</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {message && <p style={{ color: 'green', fontSize: '24px' }}>{message}</p>}
    </>
  )
}

export default App
