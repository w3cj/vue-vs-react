import { useEffect, useState } from 'react';
import YahooFinance from './YahooFinance';
import { colors } from './utils';
import StockLineChart from './components/StockLineChart';
import SymbolForm from './components/SymbolForm';
import SymbolMarquee from './components/SymbolMarquee';

function Stocks() {
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      YahooFinance.init();
    });
    return () => {
      clearTimeout(timeout);
      YahooFinance.close();
    };
  }, []);

  const addSymbol = (symbol: string) => {
    setSymbols((current) => [...current, symbol]);
  };

  const removeSymbol = (symbol: string) => {
    setSymbols((current) => current.filter((i) => i !== symbol));
  };

  return (
    <div className="stocks">
      <SymbolMarquee symbols={symbols} />
      <SymbolForm symbols={symbols} addSymbol={addSymbol} />
      <div className="charts">
        {symbols.length ? (
          symbols.map((symbol, index) => (
            <StockLineChart
              key={symbol}
              color={colors[index % colors.length]}
              symbol={symbol}
              onRemove={() => removeSymbol(symbol)}
            />
          ))
        ) : (
          <article className="chart-container">
            <p>Add a symbol to start watching.</p>
          </article>
        )}
      </div>
    </div>
  );
}

export default Stocks;
