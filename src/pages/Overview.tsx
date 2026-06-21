import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavigationBar from '../components/NavBar'
import { getTicker } from '../api/TickerService'

interface TickerOverviewData {
  ticker: string
  name: string
  market: string
  locale: string
  primary_exchange: string
  composite_figi?: string | null
  description?: string | null
  homepage_url?: string | null
  market_cap?: number | null
  total_employees?: number | null
  list_date?: string | null
  phone_number?: string | null
  round_lot?: number | null
  share_class_shares_outstanding?: number | null
  sic_code?: string | null
  sic_description?: string | null
  ticker_root?: string | null
  ticker_suffix?: string | null
  weighted_shares_outstanding?: number | null
}

const TickerOverview = () => {
  const { symbol } = useParams<{ symbol: string }>()
  const [data, setData] = useState<TickerOverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!symbol) return
    setLoading(true)
    setError(null)

    getTicker(symbol)
      .then(response => setData(response.data))
      .catch(() => setError('Failed to load ticker details.'))
      .finally(() => setLoading(false))
  }, [symbol])

  return (
    <>
      <NavigationBar />
      <div className="ticker-overview-layout">
        {loading && <p>Loading...</p>}
        {!loading && error && <p style={{ color: '#e05555' }}>{error}</p>}
        {!loading && !error && data && (
          <div>
            <h1>{data.ticker} — {data.name}</h1>
            <p>{data.description}</p>
            {/* bar chart, IPO info, etc. go here — this is a skeleton */}
          </div>
        )}
      </div>
    </>
  )
}

export default TickerOverview