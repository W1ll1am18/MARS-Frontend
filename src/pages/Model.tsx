import { useEffect } from 'react';
// import NavigationBar from '../components/NavBar'
import './Model.css'

const Model = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="model-page">

        <div className="model-header">
          <h1>What is the machine learning model?</h1>
        </div>

        <div className="model-tldr">
          <span className="model-tldr-label">TLDR</span>
          <p>
            The model looks at a stock's recent price and volume history and estimates whether, over the next 10 trading days, the price is more likely to move up, move down, or stay roughly flat. It's built to be honest about how difficult this task is, the signal it finds is real, but weak, and it should be treated as one input among many, never a forecast.
          </p>
        </div>

        <div className="model-section">
          <p>
            Predicting the stock market with any real confidence is one of the hardest open problems in machine learning, markets are noisy, mostly efficient, and full of information nobody can see coming. This model doesn't try to beat that. Instead, it tries to find a small, honest edge and say clearly how small that edge is.
          </p>
        </div>

        <div className="model-section">
          <div className="model-section-title">The triple-barrier method</div>
          <p>
            Instead of simply predicting whether a price goes up or down over a fixed period, this method sets three "barriers" around the current price and asks which one gets hit first:
          </p>
          <ul className="model-list">
            <li><strong>Upper barrier (Take-Profit):</strong> a threshold above the current price, sized using the stock's own recent volatility (via Average True Range, or ATR see below). If the price reaches this first, the outcome is labelled Up (+1).</li>
            <li><strong>Lower barrier (Stop-Loss):</strong> a threshold the same distance below the current price. If price reaches this first, the outcome is labelled Down (-1).</li>
            <li><strong>Vertical barrier (Time-Limit):</strong> a maximum holding period, called the horizon (10 trading days in this model). If neither the upper nor lower barrier is hit before time runs out, the outcome is labelled Timeout (0) meaning there wasn't enough movement either way for the model to make a confident call.</li>
          </ul>
          <p>
            If a single day's trading range is wide enough to touch both the upper and lower barrier at once, the model conservatively labels it as Down. This is a deliberate choice to avoid false certainty and it would rather risk under-calling a win than over-claim one.
          </p>
        </div>

        <div className="model-section">
          <div className="model-section-title">Why triple-barrier?</div>
          <p>
            Before landing on this approach, I tried predicting next-day price direction directly, using a range of different inputs, sentiment analysis with FinBERT, 1–50+ tickers' worth of price history, and insider-trading sentiment. Between limited compute and a realistically sized dataset (5 years of daily data from the MASSIVE API), these attempts produced predictions barely better than random guessing. Even with far more data and computing power, next-day price direction is one of the most stubbornly difficult targets in the entire field, because daily returns are dominated by noise.
          </p>
          <p>
            Triple-barrier reframes the question in a way that cuts through some of that noise. Instead of "will tomorrow's close be higher or lower," it asks: "within the next 10 days, is this stock more likely to make a meaningful move up, a meaningful move down, or go nowhere?" That's a coarser, more forgiving question and it turned out to produce a real, if modest, signal where the finer-grained version produced none.
          </p>
        </div>

        <div className="model-section">
          <div className="model-section-title">What the model actually looks at</div>
          <p>
            The model is trained on 5 years of daily price/volume data for Apple (AAPL), a set of comparable tickers in the same sector (via Finnhub), and the S&amp;P 500 (VOO) as a market-wide benchmark. From that raw data, it engineers a set of features, each one a different lens on recent price behavior:
          </p>

          <div className="model-table">
            <div className="model-table-head">
              <span>Feature</span>
              <span>Simple Definition</span>
            </div>
            {[
              ['Rate of Change (RoC)', "How much has the price moved, in percentage terms, over the last n days?"],
              ['Simple Moving Average (SMA)', 'The plain average price over n days, a smoothed-out sense of the recent trend.'],
              ['Exponential Moving Average (EMA)', 'Like SMA, but weights recent days more heavily, reacts faster to new movements.'],
              ['MACD', 'Compares a fast and slow moving average to flag when momentum is shifting.'],
              ['RSI', 'A 0–100 score of whether a stock looks "overbought" or "oversold" lately.'],
              ['Average True Range (ATR)', 'How volatile has this stock been recently? This is also what sizes the barriers themselves.'],
              ['Keltner Position (KP)', 'Where does the current price sit relative to its recent volatility range?'],
              ['Volume Ratio (VR)', 'Is buying or selling pressure dominating lately, based on volume on up-days vs. down-days?'],
              ['Spy Bull', 'Is the broader market (S&P 500) currently in an uptrend or downtrend?'],
            ].map(([feature, read]) => (
              <div className="model-table-row" key={feature}>
                <span className="model-table-feature">{feature}</span>
                <span className="model-table-read">{read}</span>
              </div>
            ))}
          </div>

          <p>
            None of these individually is a strong predictor. The goal is to give the model enough different angles on "what's been happening" that it can find patterns a single indicator would miss.
          </p>
        </div>

        <div className="model-section">
          <div className="model-section-title">How is ATR calculated?</div>
          <p>
            ATR appears twice in this model, once as an ordinary feature, and once as the ruler used to size the up/down barriers themselves.
          </p>
          <p>
            It starts with the True Range (TR) for a single day, which is the largest of three possible values:
          </p>
          <ul className="model-list">
            <li>Today's High minus today's Low</li>
            <li>The absolute difference between today's High and yesterday's Close</li>
            <li>The absolute difference between today's Low and yesterday's Close</li>
          </ul>
          <p>
            Taking the largest of these three (rather than just High − Low) matters because it captures overnight gaps. If a stock closes at $100 and opens the next day at $110 before trading in a tight $108–$112 range, a naive High − Low would understate how much the price actually moved. True Range catches that jump.
          </p>
          <p>
            Average True Range is then simply that True Range figure, smoothed over a rolling 10-day window, so a single volatile (or unusually quiet) day doesn't distort the reading. That 10-day window isn't arbitrary, it matches the model's own 10-day horizon, so the barriers are sized using the same timeframe the model is actually trying to predict over. The result is a per-stock, self-adjusting measure of "how much does this stock typically move in a day" which is exactly why it's used to size the barriers: a highly volatile stock gets wider barriers, a calmer one gets tighter barriers, rather than every ticker being forced through the same fixed threshold.
          </p>
        </div>

        <div className="model-section">
          <div className="model-section-title">How it's trained</div>
          <p>
            To avoid the model accidentally "cheating" by learning from future data it shouldn't have access to yet (a common and easy-to-miss mistake in time-series ML), training uses a walk-forward approach: the model trains on an initial block of 750 trading days, then gets tested on the next 63 days it hasn't seen. That window then rolls forward and repeats, for 7 total rounds (folds), with each round adding the newly-tested period into the training set for the next one. This mimics how the model would actually be used in practice which is always predicting forward into the unknown, never peeking backward.
          </p>
          <p>
            The model itself is a Random Forest, chosen for its resistance to overfitting and its ability to pick up on non-linear patterns. The core idea is instead of training one decision-making model, train many slightly different ones (each seeing a random subset of the features), and average their votes. Individual trees will make different mistakes; averaging them out cancels much of that error, leaving a more reliable consensus.
          </p>

          <div className="model-settings-grid">
            <div className="model-settings-block">
              <div className="model-settings-label">Random Forest settings</div>
              <ul className="model-settings-list">
                <li><code>n_estimators = 100</code> — the number of trees voting in the ensemble</li>
                <li><code>max_depth = 5</code> — how many decisions deep each tree is allowed to go</li>
                <li><code>min_samples_split = 50</code> — how much data is required before a tree is allowed to split further</li>
                <li><code>min_samples_leaf = 20</code> — the minimum data points allowed in any final branch</li>
                <li><code>class_weight = 'balanced'</code> — ensures the model doesn't just learn to always predict the most common outcome</li>
              </ul>
            </div>
            <div className="model-settings-block">
              <div className="model-settings-label">Barrier and confidence settings</div>
              <ul className="model-settings-list">
                <li><code>ATR_multiplier = 1</code> — sets how wide the up/down barriers are, scaled to the stock's own volatility</li>
                <li><code>Horizon = 10</code> — the model looks 10 trading days ahead before timing out</li>
                <li><code>Lower confidence threshold = 0.40</code> — how confident the model must be before it's willing to call "Down"</li>
                <li><code>Upper confidence threshold = 0.45</code> — how confident it must be before calling "Up"</li>
              </ul>
            </div>
          </div>

          <p className="model-ref-link">
            For information on random forests: <a href="https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html" target="_blank" rel="noreferrer">scikit-learn.org/RandomForestClassifier</a>
          </p>

          <p className="important">
            These threshold values were tuned specifically for this dataset and this scope which is exactly why the app shows a scope warning when a ticker falls outside the sectors this model was trained and validated on. A threshold tuned for tech/growth stocks isn't guaranteed to behave the same way elsewhere.
          </p>
        </div>

        <div className="model-section">
          <div className="model-section-title">How good is it, honestly?</div>
          <p>Two metrics are used to grade the model:</p>
          <ul className="model-list">
            <li><strong>Matthews Correlation Coefficient (MCC):</strong> a single score from -1 to +1 summarizing how good the predictions are across all outcome classes (Up, Down, Timeout) not just the most common one. +1 is a perfect predictor, 0 is equivalent to random guessing, and -1 means the model is systematically wrong. This matters here because a naive model could look "accurate" just by always predicting the most common outcome, MCC punishes that shortcut.</li>
            <li><strong>Macro F1:</strong> measures how well the model balances precision (when it makes a call, how often is it right?) and recall (of all the times a real move happened, how often did it catch it?) averaged evenly across all three outcome classes, so it can't hide poor performance on the harder classes behind good performance on the easy one.</li>
          </ul>
          <p>
            The model scores an <strong>MCC of 0.18</strong> and a <strong>Macro F1 of 0.42</strong>.
          </p>
          <p>
            In plain terms: the model is clearly picking up something meaningfully better than a coin flip but it's a weak signal, not a reliable forecast. Given that predicting stock direction with any real edge is one of the more famously difficult problems in quantitative finance, going from "no measurable signal at all" (the result of earlier next-day prediction attempts) to "weak but real signal" is a genuine improvement however just not one that should be mistaken for a trading strategy on its own.
          </p>
          <p>
            In the future I do plan on implementing more models across a larger set of industries and horizons. Thanks for reading!
          </p>
        </div>

        <div className="model-disclaimer">
          This tool is for education and exploration, not financial advice. No prediction here should be the sole basis for a real investment decision.
        </div>

      </div>
    </>
  )
}

export default Model