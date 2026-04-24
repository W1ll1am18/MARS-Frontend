import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tickers from './pages/Tickers';
import Overview from './pages/Overview';
import Analyse from './pages/Analyse';
import Recommendation from './pages/Recommendation';
import NotFoundPage from './pages/NotFoundPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TickerTypes from './pages/TickerTypes';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={'/MARS'} />} />
        <Route path='/MARS' element={<Home />} />
        <Route path='/tickers' element={<Tickers/>}/>
        <Route path='/overview' element={<Overview/>}/>
        <Route path='/types' element={<TickerTypes/>}/>
        <Route path='/analyse/:id' element={<Analyse/>}/> {/*Variable path*/}
        <Route path='/recommendation' element={<Recommendation/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path="*" element={<NotFoundPage />} /> {/* 404 page */}
      </Routes>
    </>
  )
}


export default App
