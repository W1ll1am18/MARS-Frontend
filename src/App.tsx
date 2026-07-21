import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tickers from './pages/Tickers';
import Overview from './pages/Overview';
import Analyse from './pages/Analyse';
import Recommendation from './pages/Recommendation';
import NotFoundPage from './pages/extra/NotFoundPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Model from './pages/Model';
import Glossary from './pages/Glossary';
import { TickerLRUCache } from './components/TickerLRUCache';
import { SavedTickers } from './components/SavedTickers';
import Layout from './Layout';

export const tickerLRUCache = new TickerLRUCache(5);
export const savedTickers = new SavedTickers();

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Navigate to={'/MARS'} />} />
          <Route path='/MARS' element={<Home />} />
          <Route path='/tickers' element={<Tickers/>}/>
          <Route path='/overview/:symbol?' element={<Overview/>}/>
          <Route path='/analyse/:id' element={<Analyse/>}/>
          <Route path='/recommendation' element={<Recommendation/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/model' element={<Model/>}/>
          <Route path='/glossary' element={<Glossary/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path="*" element={<NotFoundPage />} /> {/* 404 page */}
        </Route>
      </Routes>
    </>
  )
}


export default App
