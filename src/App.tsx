import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const [count, setCount] = useState(0)

  //insert svgs later
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
