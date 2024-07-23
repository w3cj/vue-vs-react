import { Line } from 'react-chartjs-2';
import { useCallback, useEffect, useState } from 'react';
import YahooFinance, { Stock } from '../YahooFinance';
import { lineChartOptions, getDirection } from '../utils';
import { Direction, StockInfo } from '../types';
import Symbol from './Symbol';

function updateStockInfo(info: StockInfo, update: Stock): StockInfo {
  const newLabel = new Date(update.time).toLocaleTimeString();
  if (info.options.labels.find((label) => label === newLabel)) return info;
  return {
    id: info.id,
    latest: update,
    options: {
      labels: [...info.options.labels, newLabel],
      dataset: {
        ...info.options.dataset,
        data: [
          ...info.options.dataset.data,
          {
            x: update.time,
            y: update.price,
          },
        ],
      },
    },
  };
}

export type StockLineChartProps = {
  color: string;
  symbol: string;
  onRemove: () => void;
};

export default function StockLineChart({
  color,
  symbol,
  onRemove,
}: StockLineChartProps) {
  const [direction, setDirection] = useState<Direction>('none');
  const [info, setInfo] = useState<StockInfo | null>(null);

  const onUpdate = useCallback((update: Stock) => {
    setInfo((current) => {
      if (current) {
        setDirection(getDirection(update.price - current.latest.price));
        return updateStockInfo(current, update);
      }
      return updateStockInfo(
        {
          id: update.id,
          latest: update,
          options: {
            labels: [],
            dataset: {
              label: update.id,
              borderWidth: 1,
              pointStyle: 'triangle',
              backgroundColor: color,
              borderColor: color,
              data: [],
            },
          },
        },
        update
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    YahooFinance.subscribe([symbol], onUpdate);

    return () => {
      YahooFinance.unsubscribe([symbol], onUpdate);
    };
  }, [symbol, onUpdate]);

  if (!info) {
    return (
      <article key={symbol} className="chart-container">
        <h3>{symbol} | Loading...</h3>
        <progress />
      </article>
    );
  }

  return (
    <article className={`chart-container ${direction}`} key={info.id}>
      <div className="between">
        <Symbol key={symbol} symbol={symbol} />
        <button type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <Line
        options={lineChartOptions}
        data={{
          labels: info.options.labels,
          datasets: [info.options.dataset],
        }}
      />
    </article>
  );
}
