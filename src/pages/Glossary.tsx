import { useEffect, type ReactNode } from 'react'
import './Glossary.css'

const Term = ({
  title,
  children,
  source,
  cite,
}: {
  title: string
  children: ReactNode
  source?: string
  cite?: number
}) => (
  <div className="glossary-term">
    <h3 className="glossary-term-title">
      {title}
      {cite && (
        <sup className="glossary-cite">
          <a href={`#ref-${cite}`}>[{cite}]</a>
        </sup>
      )}
    </h3>
    {children}
    {source && (
      <p className="glossary-source">
        <a href={source} target="_blank" rel="noreferrer">For more info refer to this source →</a>
      </p>
    )}
  </div>
)

const List = ({ items }: { items: ReactNode[] }) => (
  <ul className="glossary-list">
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
)

const Glossary = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="glossary-page">

        <div className="glossary-header">
          <h1>Glossary</h1>
        </div>

        {/* ── Overview stats ─────────────────────────── */}
        <div className="glossary-section">
          <div className="glossary-section-title">Overview stats</div>

          <Term title="P/E Ratio (TTM)" source="https://www.schwab.com/learn/story/stock-analysis-using-pe-ratio" cite={1}>
            <p>The Price-to-Earnings Ratio (Trailing Twelve Months) measures a company's current share price relative to its actual, historical earnings over the previous 12 months.</p>
            <p>FORWARD PE simply measures current share price over forecasted Earnings per share (EPS) for the next 12 months.</p>
            <p>It acts as a factual valuation metric to show how much investors are paying per dollar of recent profit. There's no universal 'good' P/E ratio. Investors can learn more by comparing a company's P/E ratio to its own history, its sector/industry peers, and the broader stock market. High P/E ratios may reflect overvaluation or strong growth expectations and investor confidence. Low P/E ratios may signal undervaluation or weaker growth outlooks and business risks. The P/E ratio can be distorted by buybacks, one-time items, leverage, and economic cycles, so it works best when used alongside other valuation metrics.</p>

            <div className="glossary-table">
              <div className="glossary-table-head glossary-table-head-3">
                <span>Type of P/E ratio</span>
                <span>Primary use</span>
                <span>Limitations</span>
              </div>
              <div className="glossary-table-row glossary-table-row-3">
                <span className="glossary-table-feature">Trailing P/E ratio</span>
                <span className="glossary-table-read">Analyzing valuation based on historical earnings, often for mature companies</span>
                <span className="glossary-table-read">Backward‑looking; may be distorted by one‑time items or cyclical earnings</span>
              </div>
              <div className="glossary-table-row glossary-table-row-3">
                <span className="glossary-table-feature">Forward P/E ratio</span>
                <span className="glossary-table-read">Evaluating high‑growth or transitioning companies where future earnings matter more than historical results</span>
                <span className="glossary-table-read">Relies on uncertain earnings estimates that can change or vary by source</span>
              </div>
            </div>
          </Term>

          <Term title="Market Cap" source="https://www.finra.org/investors/insights/market-cap" cite={2}>
            <p>Market capitalization (market cap) is the total dollar value of a publicly traded company's outstanding shares. It provides a quick gauge of a company's size and market value. Generally you will see companies categorised as the following, based on their market cap</p>
            <List items={[
              'mega-cap: market value of $200 billion or more;',
              'large-cap: market value between $10 billion and $200 billion;',
              'mid-cap: market value between $2 billion and $10 billion;',
              'small-cap: market value between $250 million and $2 billion;',
              'micro-cap: market value of less than $250 million.',
            ]} />
            <p>Do note that market cap is the perceived value of a company because stock price is determined by investors. It isn't necessarily the actual value of a company.</p>
          </Term>

          <Term title="Shares">
            <p>Shares are units of ownership in a company or financial asset. By purchasing shares, an investor becomes a part-owner (shareholder) in the company, which grants them proportionate claims on corporate assets and earnings.</p>
          </Term>

          <Term title="52-Week Range">
            <p>A 52-week range is a standard financial metric representing the absolute lowest and highest trading prices of a company over a rolling 52-week (one-year) period. It serves as a key indicator of price volatility. Wide ranges suggest higher volatility, while narrow ranges signify stability. Investors can quickly gauge whether a stock is near its annual trading peak, its lowest or somewhere in the middle.</p>
          </Term>

          <Term title="Beta" source="https://www.investopedia.com/terms/b/beta.asp" cite={3}>
            <p>Beta is a technical indicator of the price volatility of a stock or other asset. It can suggest the risk level of investing in the stock. The higher the beta coefficient, the greater potential risk. The market (e.g., the S&P 500) always has a defined Beta of exactly 1.0. Assets are categorized into the following ranges:</p>
            <List items={[
              <><strong>Beta = 1.0:</strong> The asset moves in perfect lockstep with the market benchmark.</>,
              <><strong>Beta &lt; 1.0:</strong> The asset is less volatile than the broader market (e.g., utilities or consumer staples). It exhibits lower systematic risk and smaller price swings.</>,
              <><strong>Beta &gt; 1.0:</strong> The asset is more volatile than the broader market (e.g., technology or growth stocks). It carries higher systematic risk, tending to amplify both market gains and losses.</>,
              <><strong>Beta = 0:</strong> The asset's returns are completely uncorrelated with the market.</>,
              <><strong>Beta &lt; 0 (Negative):</strong> The asset moves inversely to the market (e.g., gold miners or inverse ETFs). It is highly prized by portfolio managers for diversification and hedging.</>,
            ]} />
            <p>Mathematically, Beta is the covariance of the asset's returns and the market's returns, divided by the variance of the market's returns</p>
          </Term>

          <Term title="EPS (TTM)">
            <p>Earnings Per Share (EPS) is the portion of a company's profit allocated to each outstanding share of common stock, serving as a primary indicator of corporate profitability. It is calculated as net income minus preferred dividends, divided by the weighted-average number of outstanding shares. Investors use EPS to determine corporate value and gauge profitability. Because EPS does not reflect capital structure or debt risk on its own, financial experts recommend comparing it with other fundamental metrics like cash flow.</p>
          </Term>
        </div>

        {/* ── Valuation ──────────────────────────────── */}
        <div className="glossary-section">
          <div className="glossary-section-title">Valuation</div>

          <Term title="Price / Book" source="https://www.investopedia.com/terms/p/price-to-bookratio.asp" cite={4}>
            <p>The Price-to-Book (P/B) ratio (or market-to-book ratio) is a fundamental valuation metric. It compares a company's current market capitalization to its accounting (book) value. The metric determines if a stock is overvalued or undervalued, indicating what investors pay per dollar of net assets. Some investors mistakenly view the P/B ratio as forward-looking. However, it is based on current market prices and historical balance sheet data. It also does not predict future cash flows and is not inherently forward-looking.</p>
            <List items={[
              <><strong>P/B = 1:</strong> The market is valuing the company exactly in line with its reported accounting net assets.</>,
              <><strong>P/B &lt; 1:</strong> The stock may be undervalued by the market, or the market believes the stated asset values are overstated.</>,
              <><strong>P/B &gt; 1:</strong> Investors are paying a premium over the net assets, usually because the company has valuable intangible assets (like a brand or intellectual property) or strong future growth prospects.</>,
            ]} />
            <p>There is no single 'good' P/B ratio that determines whether a stock is undervalued. It's helpful to identify some general parameters or a range for P/B value, then consider various other factors and valuation measures that more accurately interpret the P/B value and forecast a company's potential for growth.</p>
          </Term>

          <Term title="EV / EBITDA (TTM)" source="https://www.investopedia.com/terms/e/ev-ebitda.asp" cite={5}>
            <p>The EV/EBITDA (TTM) ratio is a valuation metric that compares a company's total economic worth (including debt) to its actual operational cash earnings generated over the most recent 12-month period. It is widely used by investors and analysts to normalize company valuations across different capital structures.</p>
            <div className="glossary-formula">EV / EBITDA (TTM) = Enterprise Value ÷ TTM EBITDA</div>
            <p><strong>Enterprise Value (EV):</strong> EV represents the theoretical "takeover price" of a company. It accounts not just for the equity, but also for the debt required to buy the business. It is calculated by taking the market capitalization (or equity value) and adding total debt, preferred stock, and minority interest, then subtracting all cash and cash equivalents.</p>
            <p><strong>TTM EBITDA:</strong> Trailing Twelve Months refers to the prior 12 consecutive months of financial data. It represents operational earnings before interest, taxes, depreciation, and amortization.</p>
            <p>Unlike the standard P/E ratio, it includes debt, making it highly useful for comparing companies with vastly different debt and cash levels. Adding back non-cash expenses (depreciation and amortization) ensures the ratio measures actual cash-generating power rather than accounting earnings.</p>
            <p>Beware of stocks with low ratios, in some cases they are deserved for example a company that is truly struggling and will not recover. This creates a false sense of value, but industry or company fundamentals may indicate negative returns.</p>
          </Term>

          <Term title="EV / Free Cash Flow">
            <p>The EV/FCF (TTM) ratio is a valuation metric that compares a company's total acquisition value to its actual cash-generating power. It measures how many years it would take for a company to pay back its valuation through cash generation, using data from the trailing twelve months.</p>
            <div className="glossary-formula">EV / Free Cash Flow = Enterprise Value ÷ TTM Free Cash Flow</div>
            <p><strong>Free Cash Flow (FCF)</strong> evaluates the most recent full year of operations by looking at the last four quarters. FCF represents the actual cash left over after operating expenses and capital expenditures (CapEx) are paid, which can be used for expansion, dividends, or debt reduction.</p>
            <p>A lower EV/FCF ratio typically indicates a cheaper valuation, suggesting the company is generating strong cash relative to its total price. Because EV factors in debt and cash, this ratio gives a clearer picture of cash return on investment than traditional metrics like the P/E ratio.</p>
          </Term>

          <Term title="PEG Ratio" source="https://www.investopedia.com/terms/p/pegratio.asp" cite={6}>
            <p>The PEG (Price/Earnings-to-Growth) ratio is a valuation metric that measures the relative trade-off between the price of a stock, its earnings, and its expected growth. It adjusts the standard P/E ratio by dividing it by the company's earnings growth rate, providing a more comprehensive view of a company's true value.</p>
            <p>To find the PEG ratio, calculate the Price-to-Earnings (P/E) ratio and then divide it by the projected Earnings Growth Rate (EGR):</p>
            <p><strong>Earnings Growth Rate (EGR):</strong> The estimated percentage increase in EPS over a specified future period, usually 1 to 5 years. The EGR should be entered as a whole number.</p>
            <List items={[
              <><strong>PEG = 1.0:</strong> Indicates that the market valuation of the stock is perfectly aligned with its projected earnings growth (fairly valued).</>,
              <><strong>PEG &lt; 1.0:</strong> Generally considered favorable, suggesting that the stock is undervalued relative to its growth expectations.</>,
              <><strong>PEG &gt; 1.0:</strong> Suggests that investors are paying a premium for growth, which can indicate the stock is overvalued</>,
            ]} />
            <p>A negative PEG can result from either negative earnings (losses), or a negative estimated growth rate. Either case suggests that a company may be in trouble.</p>
            <p>While the P/E ratio is more commonly used by investors, the PEG ratio improves upon the P/E ratio by incorporating earnings growth estimates. This provides a fuller picture of a company's relative value in the market. However, because it relies on earnings estimates, having good estimates is key. A bad forecast or assumption, or naively projecting historical growth rates into the future, can produce unreliable PEG ratios.</p>
          </Term>

          <Term title="Forward PEG">
            <p>The Forward PEG (Price/Earnings-to-Growth) ratio is a stock valuation metric that divides a company's forward P/E ratio by its projected earnings growth rate. Unlike the standard PEG that relies on historical data, the Forward PEG uses expected future earnings, making it a forward-looking measure of whether a stock's current price is justified by its future growth potential.</p>
            <List items={[
              <>PEG = 1.0 generally indicates that the market is valuing the stock fairly in line with its expected earnings growth.</>,
              <>PEG &lt; 1.0 suggests that the stock may be undervalued, meaning you are paying a relatively low price for the projected growth.</>,
              <>PEG &gt; 1.0 suggests the stock could be overvalued, or that investors are paying a premium for expected growth</>,
            ]} />
            <p>One primary risk of using a Forward PEG is its reliance on analyst estimates, which can be speculative and vary widely. If future growth falls short of these projections, the stock will be overvalued in retrospect</p>
          </Term>

          <Term title="Dividend Yield" source="https://www.xero.com/au/glossary/dividend-yield/">
            <p>A stock's dividend yield is a financial ratio that measures how much a company pays out in dividends each year relative to its share price. Typically expressed as a percentage, it indicates the amount of cash income an investor earns for every dollar invested in the stock.</p>
          </Term>

          <Term title="Dividend Year">
            <p>Dividend Year describes the one-year period over which a company's total dividend payments are aggregated for reporting or tax purposes, or it refers to the annual recurring cycle in which a company pays dividends to its shareholders.</p>
          </Term>
        </div>

        {/* ── Profitability ──────────────────────────── */}
        <div className="glossary-section">
          <div className="glossary-section-title">Profitability</div>

          <Term title="Gross Margin (TTM)" source="https://www.investopedia.com/terms/g/grossmargin.asp">
            <p>Is a profitability metric measuring the percentage of revenue retained after deducting the direct Cost of Goods Sold (COGS) over the previous 12 months. It reveals how efficiently a company manages its core production costs.</p>
            <p>Financial analysts and investors use Gross Margin to evaluate a company's pricing power, basic production efficiency, and overall scalability. A higher margin indicates that the company retains more money from each dollar of sales, which can then be used to cover operating costs, debt, and dividend distributions.</p>
          </Term>

          <Term title="Gross Margin (Annual)" source="https://en.wikipedia.org/wiki/Gross_margin">
            <p>A profitability metric measuring the percentage of net revenue a company retains after covering the direct costs associated with producing its goods or services. When calculated annually, it evaluates a business's core production efficiency and pricing power over a 12-month fiscal period.</p>
            <p>The gross margin ratio dictates how much of each dollar of earned revenue remains to pay off operating expenses, debt obligations, and generate a net profit. Higher annual gross margins generally indicate that a company retains more financial value per sale, has superior pricing power, and exercises strict control over its direct production costs. It is a critical metric for gauging the long-term scalability of a business model, as it sets the baseline for the company's wider cost base</p>
          </Term>

          <Term title="Operating Margin (TTM)" source="https://www.investopedia.com/terms/o/operatingmargin.asp">
            <p>Is a profitability metric that measures the percentage of a company's revenue left over after paying for variable costs of production, but before deducting interest and income taxes, over the most recent 12-month period. It assesses how efficiently a firm manages its core, day-to-day business operations</p>
            <p>As the metric excludes interest expenses and tax rates, it strips away external financing or geographic tax structures to focus strictly on management's ability to generate profit from daily business activities</p>
          </Term>

          <Term title="Net Margin (TTM)">
            <p>Is a profitability ratio that measures the percentage of revenue a company retains as profit after accounting for all business expenses over the previous 12 months. It is calculated by taking the total net income and dividing it by total revenue over that period.</p>
            <p>Unlike gross margin, which only accounts for production costs, annual net margin shows what percentage of every dollar earned translates directly into actual profit.</p>
            <p>Investors and analysts utilize the TTM variant to evaluate a company's most recent and ongoing financial performance. Unlike annual metrics that can quickly become outdated, the rolling 12-month window smooths out seasonal variations.</p>
          </Term>

          <Term title="Net Margin (Annual)">
            <p>Same as Net Margin TTM but over a fixed 12 month period.</p>
          </Term>

          <Term title="Return on Equity" source="https://www.investopedia.com/terms/r/returnonequity.asp">
            <p>Return on Equity (ROE) is a financial performance ratio that measures how effectively and efficiently a company utilizes its shareholders' equity to generate profit. Expressed as a percentage, it indicates how many dollars of net income are generated for every dollar of equity capital invested.</p>
            <p>According to the Corporate Finance Institute, ROE bridges the income statement and the balance sheet to serve as a report card on management's capability. A higher ROE generally indicates strong, efficient profitability, though analysts caution that heavily leveraged companies can artificially inflate their ROE by reducing their equity base with debt.</p>
          </Term>

          <Term title="Return on Assets" source="https://corporatefinanceinstitute.com/resources/accounting/return-on-assets-roa-formula/">
            <p>Return on Assets (ROA) is a profitability ratio that measures how efficiently a company uses its assets to generate profit. It reveals how much net income is produced per dollar of assets owned.</p>
            <p>ROA varies significantly by industry. Asset-heavy industries (like manufacturing) naturally have lower ROAs than asset-light industries (like software). A higher ROA indicates better operational efficiency and asset utilization. ROA is best utilized to compare competitors within the same sector or to track an individual company's historical performance.</p>
          </Term>

          <Term title="Return on Investment" source="https://www.investopedia.com/terms/r/returnoninvestment.asp">
            <p>Return on Investment (ROI) is a fundamental financial ratio that measures the profitability or efficiency of an investment relative to its cost. Expressed as a percentage, it shows the net profit generated for every dollar initially invested. A positive ROI means total revenues exceed total costs, while a negative ROI indicates a net loss.</p>
            <p>ROI suffers from three main limitations</p>
            <List items={[
              'It does not account for the holding period or the duration of the investment.',
              'It does not adjust for the level of risk taken to achieve the return.',
              'It fails to reflect inflation or the changing value of money over long periods.',
            ]} />
          </Term>

          <Term title="Payout Ratio">
            <p>The payout ratio (or dividend payout ratio) is the proportion of a company's total earnings paid to shareholders as dividends, expressed as a percentage. It measures the balance between rewarding shareholders and retaining earnings for debt repayment or business growth. A ratio over 100% indicates a company is paying out more than it earns, which is generally unsustainable and usually acts as a red flag for investors.</p>
          </Term>
        </div>

        {/* ── Financial Health ───────────────────────── */}
        <div className="glossary-section">
          <div className="glossary-section-title">Financial Health</div>

          <Term title="Current Ratio" source="https://www.investopedia.com/terms/c/currentratio.asp">
            <p>The current ratio is a fundamental liquidity metric used to measure a company's ability to cover its short-term obligations (debts and bills due within a year) with its short-term assets. Also known as the working capital ratio, it provides a snapshot of a business's near-term financial health.</p>
          </Term>

          <Term title="Quick Ratio" source="https://www.xero.com/au/glossary/quick-ratio">
            <p>The quick ratio (also known as the acid-test ratio) is a fundamental liquidity metric used in finance to measure a company's ability to instantly cover its short-term debts using its most highly liquid assets. It excludes less-liquid assets like inventory and prepaid expenses.</p>
            <p>Financial institutions and investors consider a quick ratio of 1.0 or higher to be the general standard, meaning the company possesses at least one dollar of liquid assets for every dollar of short-term debt</p>
            <List items={[
              <><strong>&gt; 1.0:</strong> Indicates robust short-term financial health; the company can meet its immediate obligations without needing to sell off inventory.</>,
              <><strong>&lt; 1.0:</strong> Indicates potential cash flow difficulties; the company may need to rely on future sales or external financing to pay its short-term bills</>,
            ]} />
          </Term>

          <Term title="Debt / Equity" source="https://www.investopedia.com/terms/d/debtequityratio.asp">
            <p><strong>Debt</strong> refers to borrowed capital that must be repaid over time, typically with interest.</p>
            <p><strong>Equity</strong> represents ownership in an asset or company</p>
            <p>The debt-to-equity (D/E) ratio is a foundational leverage metric used to evaluate a company's financial structure. It indicates how much a business relies on debt to finance its operations relative to the value of shareholder equity</p>
            <List items={[
              <><strong>Ratio = 1.0:</strong> This indicates an equal balance where creditors and owners each contribute half to the company's financing.</>,
              <><strong>Ratio &gt; 1.0:</strong> The company relies primarily on debt financing, which generally carries higher investment and default risk, but can magnify returns during profitable periods.</>,
              <><strong>Ratio &lt; 1.0:</strong> The company is primarily financed by equity, signaling a more conservative capital structure and greater financial stability</>,
            ]} />
          </Term>
        </div>

        {/* ── Growth ─────────────────────────────────── */}
        <div className="glossary-section">
          <div className="glossary-section-title">Growth</div>

          <p className="glossary-intro">Revenue Growth measures the percentage change in a company's top-line revenue over a specified time horizon, serving as a core indicator of demand and market expansion</p>

          <Term title="Revenue Growth YoY">
            <p>The percentage change in revenue for a specific period compared directly to the exact same period in the preceding fiscal year. It eliminates seasonality by comparing equivalent timeframes</p>
            <p>Best used for spotting immediate momentum and seasonal adjustments.</p>
          </Term>

          <Term title="Revenue Growth 3Y">
            <p>The annualized or cumulative rate of change in revenue over a trailing three-year horizon. In institutional finance, it is almost exclusively expressed as a Compound Annual Growth Rate (CAGR) to smooth out year-to-year volatility and provide a steady multi-year trajectory.</p>
            <p>Best used for assessing mid-term stability and product lifecycle adoption.</p>
          </Term>

          <Term title="Revenue Growth 5Y">
            <p>The geometric annualized growth rate of a company's revenue over a five-year period. This metric evaluates long-term strategic execution, structural market shifts, and cyclical business sustainability beyond short-term macroeconomic shocks.</p>
            <p>Best used for Gauging secular trends, macroeconomic resilience, and long-term scaling.</p>
          </Term>

          <p className="glossary-intro">Earnings Per Share (EPS) growth is a financial metric used to evaluate a company's per-share profitability over time.</p>

          <Term title="EPS Growth YoY">
            <p>Measures the percentage change in EPS compared directly to the same period (annual or quarterly) one year earlier. It evaluates immediate business momentum and short-term profitability.</p>
          </Term>

          <Term title="EPS Growth 3Y">
            <p>Calculates the compound annual growth rate (CAGR) of a company's EPS over a three-year period. It helps smooth out year-to-year volatility to reveal a mid-term trajectory of core profitability.</p>
          </Term>

          <Term title="EPS Growth 5Y">
            <p>Determines the compound annual growth rate (CAGR) of EPS over a five-year period. This is the standard long-term benchmark used to gauge sustainable earnings generation and a company's overall maturity.</p>
          </Term>
        </div>

        {/* ── References ─────────────────────────────── */}
        <div className="glossary-section glossary-references">
          <div className="glossary-section-title">References</div>

          <p id="ref-1">
            <span className="ref-num">[1]</span> C. Schwab, "Stock Analysis Using the P/E Ratio," Schwab Brokerage, May 17, 2023. <a href="https://www.schwab.com/learn/story/stock-analysis-using-pe-ratio" target="_blank" rel="noreferrer">https://www.schwab.com/learn/story/stock-analysis-using-pe-ratio</a>
          </p>
          <p id="ref-2">
            <span className="ref-num">[2]</span> finra, "Market Cap, Explained | FINRA.org," www.finra.org, Sept. 30, 2022. <a href="https://www.finra.org/investors/insights/market-cap" target="_blank" rel="noreferrer">https://www.finra.org/investors/insights/market-cap</a>
          </p>
          <p id="ref-3">
            <span className="ref-num">[3]</span> W. Kenton, "Beta: Definition, Calculation, and Explanation for Investors," Investopedia, May 30, 2025. <a href="https://www.investopedia.com/terms/b/beta.asp" target="_blank" rel="noreferrer">https://www.investopedia.com/terms/b/beta.asp</a>
          </p>
          <p id="ref-4">
            <span className="ref-num">[4]</span> J. Fernando, "Price-to-Book (P/B) Ratio: Meaning, Formula, and Example," Investopedia, June 20, 2024. <a href="https://www.investopedia.com/terms/p/price-to-bookratio.asp" target="_blank" rel="noreferrer">https://www.investopedia.com/terms/p/price-to-bookratio.asp</a> 
          </p>
          <p id="ref-5">
            <span className="ref-num">[5]</span> A. Hayes, "Enterprise Multiple Definition," Investopedia, Apr. 09, 2022. <a href="https://www.investopedia.com/terms/e/ev-ebitda.asp" target="_blank" rel="noreferrer">https://www.investopedia.com/terms/e/ev-ebitda.asp</a>
          </p>
          <p id="ref-6">
            <span className="ref-num">[6]</span> W. Kenton, "Why the Price/Earnings-to-Growth Ratio Matters," Investopedia, Mar. 12, 2024. <a href="https://www.investopedia.com/terms/p/pegratio.asp" target="_blank" rel="noreferrer">https://www.investopedia.com/terms/p/pegratio.asp</a> 
          </p>
        </div>

      </div>
    </>
  )
}

export default Glossary