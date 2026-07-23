import './App.css'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'))
const Tickers = lazy(() => import('./pages/Tickers'))
const Overview = lazy(() => import('./pages/Overview'))
const Recommendation = lazy(() => import('./pages/Recommendation'))
const NotFoundPage = lazy(() => import('./pages/extra/NotFoundPage'))
import Profile from './pages/Profile';
import Settings from './pages/Settings';
const Model = lazy(() => import('./pages/Model'))
const Glossary = lazy(() => import('./pages/Glossary'))
import { TickerLRUCache } from './components/TickerLRUCache';
import { SavedTickers } from './components/SavedTickers';
import Layout from './Layout';

export const tickerLRUCache = new TickerLRUCache(5);
export const savedTickers = new SavedTickers();

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Navigate to={'/MARS'} />} />
            <Route path='/MARS' element={<Home />} />
            <Route path='/tickers' element={<Tickers />} />
            <Route path='/overview/:symbol?' element={<Overview />} />
            <Route path='/recommendation' element={<Recommendation />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/model' element={<Model />} />
            <Route path='/glossary' element={<Glossary />} />
            <Route path='/settings' element={<Settings />} />
            <Route path="*" element={<NotFoundPage />} /> {/* 404 page */}
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}


export default App
