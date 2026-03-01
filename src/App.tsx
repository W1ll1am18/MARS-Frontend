import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={'/MARS'} />} />
        <Route path='/MARS' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
