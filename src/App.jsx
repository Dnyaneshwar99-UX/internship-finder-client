import { useState } from 'react'
import './App.css'
import Landing from './pages/Landing'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Landing/>
    </div>
  )
}

export default App
