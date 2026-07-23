import './TickerCard.css'

interface TickerData {
  ticker: string
  name: string
  type: string
  market: string
  locale: string
  primary_exchange: string
  currency_name?: string | null
  cik?: string | null
  composite_figi?: string | null
  share_class_figi?: string | null
  active: boolean
  delisted_utc?: string | null
  last_updated_utc?: string | null
}

interface TickerCardProps {
  data: TickerData
  onClick?: () => void
}

const formatDate = (utc: string | null | undefined) => {
  if (!utc) return '—'
  return new Date(utc).toLocaleDateString('en-AU', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

const TickerCard = ({ data, onClick }: TickerCardProps) => {
  return (
    <div className="ticker-card" onClick={onClick}>

      {/* Header */}
      <div className="tc-header">
        <div className="tc-symbol">{data.ticker}</div>
        <span className={`tc-badge ${data.active ? 'badge-active' : 'badge-delisted'}`}>
          {data.active ? 'Active' : 'Delisted'}
        </span>
      </div>

      {/* Company name */}
      <div className="tc-name">{data.name}</div>

      {/* Divider */}
      <div className="tc-divider" />

      {/* Key info grid */}
      <div className="tc-grid">
        <div className="tc-cell">
          <span className="tc-cell-label">Type</span>
          <span className="tc-cell-value tc-tag">{data.type}</span>
        </div>
        <div className="tc-cell">
          <span className="tc-cell-label">Market</span>
          <span className="tc-cell-value">{data.market}</span>
        </div>
        <div className="tc-cell">
          <span className="tc-cell-label">Exchange</span>
          <span className="tc-cell-value">{data.primary_exchange || '—'}</span>
        </div>
        <div className="tc-cell">
          <span className="tc-cell-label">Currency</span>
          <span className="tc-cell-value">{data.currency_name?.toUpperCase() || '—'}</span>
        </div>
        <div className="tc-cell">
          <span className="tc-cell-label">Locale</span>
          <span className="tc-cell-value">{data.locale.toUpperCase()}</span>
        </div>
        <div className="tc-cell">
          <span className="tc-cell-label">Updated</span>
          <span className="tc-cell-value">{formatDate(data.last_updated_utc)}</span>
        </div>
      </div>

      {/* Footer identifiers */}
      {(data.cik || data.composite_figi) && (
        <div className="tc-footer">
          {data.cik && (
            <span className="tc-id-pill">CIK {data.cik}</span>
          )}
          {data.composite_figi && (
            <span className="tc-id-pill">FIGI {data.composite_figi}</span>
          )}
        </div>
      )}

    </div>
  )
}

export default TickerCard