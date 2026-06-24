import { useEffect, useRef } from 'react'
import { createChart, CandlestickSeries } from 'lightweight-charts'

export interface OHLCVBar {
    time: string   // 'YYYY-MM-DD'
    open: number
    high: number
    low: number
    close: number
    volume: number
}

interface PriceChartProps {
    data: OHLCVBar[]
}

const PriceChart = ({ data }: PriceChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current || data.length === 0) return

        const chart = createChart(containerRef.current, {
            layout: {
                background: { color: 'transparent' },
                textColor: '#dadce1',
                attributionLogo: true, //TradingView License Requirement
            },
            grid: {
                vertLines: { color: 'rgba(255,255,255,0.05)' },
                horzLines: { color: 'rgba(255,255,255,0.05)' },
            },
            timeScale: {
                borderColor: 'rgba(255,255,255,0.1)',
            },
            rightPriceScale: {
                borderColor: 'rgba(255,255,255,0.1)',
            },
            width: containerRef.current.clientWidth,
            height: 300,
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
        chart.timeScale().fitContent()

        const resizeObserver = new ResizeObserver(entries => {
            const { width } = entries[0].contentRect
            chart.applyOptions({ width })
        })

        resizeObserver.observe(containerRef.current)

        return () => {
            resizeObserver.disconnect()
            chart.remove()
        }
    }, [data])

    return <div ref={containerRef} style={{ width: '100%', height: '300px' }} />
}

export default PriceChart