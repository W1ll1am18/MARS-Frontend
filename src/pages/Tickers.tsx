import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../components/NavBar'
import './Tickers.css'
import { getTickers } from '../api/TickerService'
import TickerCard from '../components/TickerCard'

const MARKET_OPTIONS = ['', 'STOCKS', 'CRYPTO', 'FX', 'OTC', 'INDICES']
const TYPE_OPTIONS = [
  '', 'CS', 'ADRC', 'ADRP', 'ADRR', 'UNIT', 'RIGHT', 'PFD', 'FUND', 'SP',
  'WARRANT', 'INDEX', 'ETF', 'ETN', 'OS', 'GDR', 'OTHER', 'NYRS', 'AGEN',
  'EQLK', 'BOND', 'ADRW', 'BASKET', 'LT',
]
const SORT_OPTIONS = ['TICKER', 'NAME', 'MARKET', 'LOCALE', 'PRIMARY_EXCHANGE', 'TYPE', 'CURRENCY_SYMBOL', 'LAST_UPDATED_UTC']
const ORDER_OPTIONS = ['ASC', 'DESC']

export interface TickerFilters {
  ticker: string
  type: string
  market: string
  exchange: string
  cik: string
  date: string
  search: string
  active: boolean
  order: string
  sort: string
  limit: number
}

const Tickers = () => {
  const [filters, setFilters] = useState<TickerFilters>({
    ticker: '',
    type: 'CS',
    market: 'STOCKS',
    exchange: '',
    cik: '',
    date: '',
    search: '',
    active: true,
    order: 'ASC',
    sort: 'TICKER',
    limit: 100,
  })

  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)
  const navigate = useNavigate();

  const handleChange = (field: keyof TickerFilters, value: string | boolean | number) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const response = await getTickers(filters)
      setResults(response.data.results ?? [])
      console.log(response.data.results);
    } catch (err) {
      setError('Failed to fetch tickers. Please try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFilters({
      ticker: '', type: '', market: 'STOCKS', exchange: '',
      cik: '', date: '', search: '', active: true,
      order: 'ASC', sort: 'TICKER', limit: 100,
    })
    setResults([])
    setError(null)
  }

  return (
    <>
      <NavigationBar />

      <div className="tickers-layout">

        {/* LEFT PANEL */}
        <aside className="filters-panel">
          <h2 className="panel-title">Search Tickers</h2>
          <form onSubmit={handleSubmit} className="filters-form">

            <div className="field-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Company name or ticker…"
                value={filters.search}
                onChange={e => handleChange('search', e.target.value)}
              />
            </div>

            <div className="field-group">
              <label>Ticker Symbol</label>
              <input
                type="text"
                placeholder="e.g. AAPL"
                value={filters.ticker}
                onChange={e => handleChange('ticker', e.target.value.toUpperCase())}
              />
            </div>

            <div className="field-group">
              <label>Market</label>
              <select value={filters.market} onChange={e => handleChange('market', e.target.value)}>
                {MARKET_OPTIONS.map(o => (
                  <option key={o} value={o}>{o === '' ? 'All markets' : o}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label>Type</label>
              <select value={filters.type} onChange={e => handleChange('type', e.target.value)}>
                {TYPE_OPTIONS.map(o => (
                  <option key={o} value={o}>{o === '' ? 'All types' : o}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label>Exchange (MIC)</label>
              <input
                type="text"
                placeholder="e.g. XNAS"
                value={filters.exchange}
                onChange={e => handleChange('exchange', e.target.value.toUpperCase())}
              />
            </div>

            <div className="field-group">
              <label>CIK</label>
              <input
                type="text"
                placeholder="e.g. 0000320193"
                value={filters.cik}
                onChange={e => handleChange('cik', e.target.value)}
              />
            </div>

            <div className="field-group">
              <label>Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={e => handleChange('date', e.target.value)}
              />
            </div>

            <div className="field-row">
              <div className="field-group half">
                <label>Sort By</label>
                <select value={filters.sort} onChange={e => handleChange('sort', e.target.value)}>
                  {SORT_OPTIONS.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field-group half">
                <label>Order</label>
                <select value={filters.order} onChange={e => handleChange('order', e.target.value)}>
                  {ORDER_OPTIONS.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-row">
              <div className="field-group half">
                <label>Limit</label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={filters.limit}
                  onChange={e => handleChange('limit', parseInt(e.target.value) || 100)}
                />
              </div>
              <div className="field-group half checkbox-group">
                <label>Active only</label>
                <input
                  type="checkbox"
                  checked={filters.active}
                  onChange={e => handleChange('active', e.target.checked)}
                />
              </div>
            </div>

            <div className="button-row">
              <button type="submit" className="btn-primary">Search</button>
              <button type="button" className="btn-secondary" onClick={handleReset}>Reset</button>
            </div>

          </form>
        </aside>

        {/* RIGHT PANEL */}
        <main className="results-panel">

          {loading && (
            <div className="results-placeholder">
              <p>Loading...</p>
            </div>
          )}

          {!loading && error && (
            <div className="results-placeholder">
              <p style={{ color: '#e05555' }}>{error}</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && !searched && (
            <div className="results-placeholder">
              <p>Results will appear here</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && searched && (
            <div className="results-placeholder">
              <p>No results found</p>
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <>
              <div className="results-count">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </div>
              <div className="results-grid">
                {results.map(t => (
                  <TickerCard
                    key={`${t.ticker}-${t.primary_exchange}`}
                    data={t}
                    onClick={() => navigate(`/overview/${t.ticker}`)}
                  />
                ))}
              </div>
            </>
          )}

        </main>

      </div>
    </>
  )
}

export default Tickers