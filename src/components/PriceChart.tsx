import { useEffect, useRef, useState, useMemo } from 'react'
import { createChart, CandlestickSeries, type IChartApi, type UTCTimestamp } from 'lightweight-charts'

export interface OHLCVBar {
    time: string
    open: number
    high: number
    low: number
    close: number
    volume: number
}

interface PriceChartProps {
    data: OHLCVBar[]
}

type Granularity = 'month' | 'year'

const PriceChart = ({ data }: PriceChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const chartRef = useRef<IChartApi | null>(null)
    const [granularity, setGranularity] = useState<Granularity>('month')
    const [periodOffset, setPeriodOffset] = useState(0)   // 0 = most recent period, 1 = one back, etc.

    const dataBounds = useMemo(() => {
        if (data.length === 0) return null
        return {
            earliest: new Date(data[0].time),
            latest: new Date(data[data.length - 1].time),
        }
    }, [data])

    useEffect(() => {
        if (!containerRef.current || data.length === 0) return

        const chart = createChart(containerRef.current, {
            layout: { background: { color: 'transparent' }, textColor: '#dadce1', attributionLogo: true },
            grid: {
                vertLines: { color: 'rgba(255,255,255,0.05)' },
                horzLines: { color: 'rgba(255,255,255,0.05)' },
            },
            timeScale: { borderColor: 'rgba(255,255,255,0.1)' },
            rightPriceScale: { borderColor: 'rgba(255,255,255,0.1)' },
            autoSize: true,
        })

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#44de2c',
            downColor: '#de2c2c',
            borderUpColor: '#44de2c',
            borderDownColor: '#de2c2c',
            wickUpColor: '#44de2c',
            wickDownColor: '#de2c2c',
        })

        candleSeries.setData(data)
        chartRef.current = chart
        setPeriodOffset(0)   // reset to most recent period whenever data reloads

        return () => {
            chart.remove()
            chartRef.current = null
        }
    }, [data])

    // Recompute + apply the visible range whenever offset or granularity changes
    useEffect(() => {
        if (!chartRef.current || !dataBounds) return

        const { latest } = dataBounds
        const periodEnd = new Date(latest)
        const periodStart = new Date(latest)

        if (granularity === 'month') {
            periodEnd.setMonth(periodEnd.getMonth() - periodOffset + 1, 0)   // last day of target month
            periodStart.setMonth(periodStart.getMonth() - periodOffset, 1)  // first day of target month
        } else {
            periodEnd.setFullYear(periodEnd.getFullYear() - periodOffset, 11, 31)
            periodStart.setFullYear(periodStart.getFullYear() - periodOffset, 0, 1)
        }

        chartRef.current.timeScale().setVisibleRange({
            from: Math.floor(periodStart.getTime() / 1000) as UTCTimestamp,
            to: Math.floor(periodEnd.getTime() / 1000) as UTCTimestamp,
        })
    }, [periodOffset, granularity, dataBounds])

    // Don't let the user page past the data you actually have loaded
    const canGoOlder = useMemo(() => {
        if (!dataBounds) return false
        const nextStart = new Date(dataBounds.latest)
        if (granularity === 'month') nextStart.setMonth(nextStart.getMonth() - periodOffset - 1, 1)
        else nextStart.setFullYear(nextStart.getFullYear() - periodOffset - 1, 0, 1)
        return nextStart >= dataBounds.earliest
    }, [dataBounds, periodOffset, granularity])

    const canGoNewer = periodOffset > 0

    const currentLabel = useMemo(() => {
        if (!dataBounds) return ''
        const d = new Date(dataBounds.latest)
        if (granularity === 'month') {
            d.setMonth(d.getMonth() - periodOffset)
            return d.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
        }
        d.setFullYear(d.getFullYear() - periodOffset)
        return `${d.getFullYear()}`
    }, [dataBounds, periodOffset, granularity])

    return (
        <div className="price-chart">
            <div ref={containerRef} className="price-chart-canvas" />

            <div className="chart-nav-row">
                <div className="chart-granularity-toggle">
                    <button
                        className={granularity === 'month' ? 'active' : ''}
                        onClick={() => { setGranularity('month'); setPeriodOffset(0) }}
                    >
                        Month
                    </button>
                    <button
                        className={granularity === 'year' ? 'active' : ''}
                        onClick={() => { setGranularity('year'); setPeriodOffset(0) }}
                    >
                        Year
                    </button>
                </div>

                <div className="chart-pager">
                    <button disabled={!canGoOlder} onClick={() => setPeriodOffset(o => o + 1)}>
                        ← Older
                    </button>
                    <span className="chart-current-period">{currentLabel}</span>
                    <button disabled={!canGoNewer} onClick={() => setPeriodOffset(o => Math.max(0, o - 1))}>
                        Newer →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PriceChart