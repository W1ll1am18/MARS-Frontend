import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavigationBar from '../components/NavBar'
import { getTicker } from '../api/TickerService'
import './Overview.css'
import { getPrices } from '../api/PriceService'
import PriceChart, { type OHLCVBar } from '../components/PriceChart'

interface TickerOverviewData {
  // ── Core ticker fields (MASSIVE) ──────────────────
  ticker: string
  name: string
  market: string
  locale: string
  type: string
  primaryExchange?: string | null
  compositeFigi?: string | null
  description?: string | null
  homepageUrl?: string | null
  listDate?: string | null
  totalEmployees?: number | null
  marketCap?: number | null
  sicCode?: string | null
  sicDescription?: string | null
  phoneNumber?: string | null
  roundLot?: number | null
  tickerRoot?: string | null
  tickerSuffix?: string | null
  shareClassSharesOutstanding?: number | null
  weightedSharesOutstanding?: number | null

  // ── Valuation (Finnhub) ───────────────────────────
  peRatioTTM?: number | null
  peRatioAnnual?: number | null
  forwardPE?: number | null
  priceToBook?: number | null
  pegRatio?: number | null
  forwardPegRatio?: number | null
  evEbitdaTTM?: number | null
  evFreeCashFlow?: number | null
  priceToFreeCashFlow?: number | null
  enterpriseValue?: number | null
  dividendYield?: number | null
  dividendPerYear?: number | null

  // ── Price metrics (Finnhub) ───────────────────────
  weekHigh52?: number | null
  weekHigh52Date?: string | null
  weekLow52?: number | null
  weekLow52Date?: string | null
  beta?: number | null
  epsTTM?: number | null
  epsGrowthYoy?: number | null

  // ── Profitability (Finnhub) ───────────────────────
  grossMarginTTM?: number | null
  grossMarginAnnual?: number | null
  operatingMarginTTM?: number | null
  netProfitMarginTTM?: number | null
  netProfitMarginAnnual?: number | null
  returnOnEquity?: number | null
  returnOnAssets?: number | null
  returnOnInvestment?: number | null
  payoutRatio?: number | null

  // ── Financial health (Finnhub) ────────────────────
  currentRatio?: number | null
  quickRatio?: number | null
  debtToEquity?: number | null

  // ── Growth (Finnhub) ──────────────────────────────
  revenueGrowthYoy?: number | null
  revenueGrowth3y?: number | null
  revenueGrowth5y?: number | null
  epsGrowth3y?: number | null
  epsGrowth5y?: number | null
}

const fmt = (n?: number | null, decimals = 2) =>
  n != null ? n.toFixed(decimals) : '—'

const fmtPct = (n?: number | null) =>
  n != null ? `${n >= 0 ? '+' : ''}${n.toFixed(2)}%` : '—'

const fmtLarge = (n?: number | null) => {
  if (n == null) return '—'
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  return `$${n.toFixed(2)}`
}

const fmtDate = (d?: string | null) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-AU', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

const fmtMoney = (n?: number | null) =>
  n != null ? `$${n.toFixed(2)}` : '—'

const growthClass = (n?: number | null) =>
  n == null ? '' : n >= 0 ? 'pos' : 'neg'

const TickerOverview = () => {
  const { symbol } = useParams<{ symbol: string }>()
  const [data, setData] = useState<TickerOverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bars, setBars] = useState<OHLCVBar[]>([])
  const [barsLoading, setBarsLoading] = useState(true)

  useEffect(() => {
    if (!symbol) return
    setLoading(true)
    setError(null)
    setBars([])
    setBarsLoading(true)

    // Sequential — ticker must exist before prices are fetched
    getTicker(symbol)
      .then(r => {
        setData(r.data)
        return getPrices(symbol)
      })
      .then(r => setBars(r.data.results ?? []))
      .catch(() => setError('Failed to load ticker details.'))
      .finally(() => {
        setLoading(false)
        setBarsLoading(false)
      })
  }, [symbol])

  if (!symbol) return <><NavigationBar /><div className="no-symbol">No ticker to analyse. Please select one</div></>
  if (loading) return <><NavigationBar /><div className="ov-loading">Loading...</div></>
  if (error) return <><NavigationBar /><div className="ov-error">{error}</div></>
  if (!data) return null
  if (data.type && data.type !== 'CS' && data.type !== 'ADRC' && data.type !== 'ADRP') {
    return (
      <>
        <NavigationBar />
        <div className="ov">
          <div className="ov-header">
            <div className="ov-header-left">
              <h1>{data.ticker} — {data.name}</h1>
              <div className="ov-header-sub">
                <span className="ov-badge ov-badge-muted">{data.type}</span>
                {data.primaryExchange && <span className="ov-badge ov-badge-muted">{data.primaryExchange}</span>}
              </div>
            </div>
          </div>
          <div className="ov-chart-card" style={{ marginBottom: '1.5rem' }}>
            <div className="ov-section-title">Price chart</div>
            <div className="ov-section-sub">OHLCV daily bars</div>
            {barsLoading
              ? <div className="ov-chart-placeholder">Loading chart...</div>
              : <PriceChart data={bars} />
            }
          </div>
          <div className="ov-desc-card">
            <p className="ov-desc-text">
              Detailed financial analysis is currently available for common stocks only.
              {data.type === 'ETF' && ' ETF metrics require a premium data subscription.'}
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavigationBar />
      <div className="ov">

        {/* ── Header ──────────────────────────────────── */}
        <div className="ov-header">
          <div className="ov-header-left">
            <h1>{data.ticker} — {data.name}</h1>
            <div className="ov-header-sub">
              <span className="ov-badge ov-badge-active">Active</span>
              {data.primaryExchange && <span className="ov-badge ov-badge-muted">{data.primaryExchange}</span>}
              {data.sicDescription && <span className="ov-muted">{data.sicDescription}</span>}
              <span className="ov-muted">{data.market?.toUpperCase()}</span>
            </div>
          </div>
          <div className="ov-header-actions">
            <button className="ov-btn">⭐ Save</button>
            {data.homepageUrl && (
              <a className="ov-btn" href={data.homepageUrl} target="_blank" rel="noreferrer">
                🔗 Homepage
              </a>
            )}
          </div>
        </div>

        {/* ── Top stat cards ───────────────────────────── */}
        <div className="ov-stat-row">
          <div className="ov-stat-card">
            <div className="ov-stat-label">P/E Ratio (TTM)</div>
            <div className="ov-stat-value">{fmt(data.peRatioTTM)}</div>
            <div className="ov-stat-sub">Forward P/E: {fmt(data.forwardPE)}</div>
          </div>
          <div className="ov-stat-card">
            <div className="ov-stat-label">Market Cap</div>
            <div className="ov-stat-value">{fmtLarge(data.marketCap)}</div>
            <div className="ov-stat-sub">
              Shares: {data.shareClassSharesOutstanding?.toLocaleString() ?? '—'}
            </div>
          </div>
          <div className="ov-stat-card">
            <div className="ov-stat-label">52-Week Range</div>
            <div className="ov-stat-value ov-stat-range">
              {fmtMoney(data.weekLow52)} – {fmtMoney(data.weekHigh52)}
            </div>
            <div className="ov-stat-sub">Beta: {fmt(data.beta)}</div>
          </div>
          <div className="ov-stat-card">
            <div className="ov-stat-label">EPS (TTM)</div>
            <div className="ov-stat-value">{fmtMoney(data.epsTTM)}</div>
            <div className={`ov-stat-sub ${growthClass(data.epsGrowthYoy)}`}>
              {fmtPct(data.epsGrowthYoy)} YoY
            </div>
          </div>
        </div>

        {/* ── Chart + Company info ─────────────────────── */}
        <div className="ov-main-grid">
          <div className="ov-chart-card">
            <div className="ov-section-title">Price chart</div>
            <div className="ov-section-sub">OHLCV daily bars</div>
            {barsLoading
              ? <div className="ov-chart-placeholder">Loading chart...</div>
              : <PriceChart data={bars} />
            }
          </div>
          <div className="ov-info-card">
            <div className="ov-section-title">Company info</div>
            {([
              ['IPO Date', fmtDate(data.listDate)],
              ['Employees', data.totalEmployees?.toLocaleString()],
              ['SIC Code', data.sicCode],
              ['SIC Description', data.sicDescription],
              ['Composite FIGI', data.compositeFigi],
              ['Round Lot', data.roundLot],
              ['Ticker Root', data.tickerRoot],
            ] as [string, string | number | null | undefined][]).map(([label, value]) => (
              <div className="ov-info-row" key={label}>
                <span className="ov-info-label">{label}</span>
                <span className="ov-info-value">{value ?? '—'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Metrics grid ─────────────────────────────── */}
        <div className="ov-metrics-grid">

          <div className="ov-metrics-section">
            <div className="ov-section-title">Valuation</div>
            {([
              ['P/E (TTM)', fmt(data.peRatioTTM)],
              ['P/E (Annual)', fmt(data.peRatioAnnual)],
              ['Forward P/E', fmt(data.forwardPE)],
              ['Price / Book', fmt(data.priceToBook)],
              ['EV / EBITDA (TTM)', fmt(data.evEbitdaTTM)],
              ['EV / Free Cash Flow', fmt(data.evFreeCashFlow)],
              ['Price / Free Cash Flow', fmt(data.priceToFreeCashFlow)],
              ['PEG Ratio', fmt(data.pegRatio)],
              ['Forward PEG', fmt(data.forwardPegRatio)],
              ['Dividend Yield', data.dividendYield != null ? `${fmt(data.dividendYield)}%` : '—'],
              ['Dividend / Year', data.dividendPerYear != null ? fmtMoney(data.dividendPerYear) : '—'],
            ] as [string, string][]).map(([label, value]) => (
              <div className="ov-metric-row" key={label}>
                <span className="ov-metric-label">{label}</span>
                <span className="ov-metric-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="ov-metrics-section">
            <div className="ov-section-title">Profitability</div>
            {([
              ['Gross Margin (TTM)', data.grossMarginTTM],
              ['Gross Margin (Annual)', data.grossMarginAnnual],
              ['Operating Margin (TTM)', data.operatingMarginTTM],
              ['Net Margin (TTM)', data.netProfitMarginTTM],
              ['Net Margin (Annual)', data.netProfitMarginAnnual],
              ['Return on Equity', data.returnOnEquity],
              ['Return on Assets', data.returnOnAssets],
              ['Return on Investment', data.returnOnInvestment],
              ['Payout Ratio', data.payoutRatio],
            ] as [string, number | null | undefined][]).map(([label, value]) => (
              <div className="ov-metric-row" key={label}>
                <span className="ov-metric-label">{label}</span>
                <span className="ov-metric-value">
                  {value != null ? `${fmt(value)}%` : '—'}
                </span>
              </div>
            ))}
          </div>

          <div className="ov-metrics-section">
            <div className="ov-section-title">Financial health</div>
            {([
              ['Current Ratio', fmt(data.currentRatio)],
              ['Quick Ratio', fmt(data.quickRatio)],
              ['Debt / Equity', fmt(data.debtToEquity)],
              ['Enterprise Value', fmtLarge(data.enterpriseValue)],
            ] as [string, string][]).map(([label, value]) => (
              <div className="ov-metric-row" key={label}>
                <span className="ov-metric-label">{label}</span>
                <span className="ov-metric-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="ov-metrics-section">
            <div className="ov-section-title">Growth</div>
            {([
              ['Revenue growth (YoY)', data.revenueGrowthYoy],
              ['Revenue growth (3Y)', data.revenueGrowth3y],
              ['Revenue growth (5Y)', data.revenueGrowth5y],
              ['EPS growth (YoY)', data.epsGrowthYoy],
              ['EPS growth (3Y)', data.epsGrowth3y],
              ['EPS growth (5Y)', data.epsGrowth5y],
            ] as [string, number | null | undefined][]).map(([label, value]) => (
              <div className="ov-metric-row" key={label}>
                <span className="ov-metric-label">{label}</span>
                <span className={`ov-metric-value ${growthClass(value)}`}>
                  {fmtPct(value)}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* ── About + Contact ───────────────────────────── */}
        <div className="ov-bottom-row">
          <div className="ov-desc-card">
            <div className="ov-section-title">About</div>
            <p className="ov-desc-text">{data.description ?? 'No description available.'}</p>
          </div>
          <div className="ov-contact-card">
            <div className="ov-section-title">Contact</div>
            {data.phoneNumber && (
              <div className="ov-contact-row">📞 {data.phoneNumber}</div>
            )}
            {data.homepageUrl && (
              <div className="ov-contact-row">
                🌐 <a href={data.homepageUrl} target="_blank" rel="noreferrer">
                  {data.homepageUrl.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  )
}

export default TickerOverview