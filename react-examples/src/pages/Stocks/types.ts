import { ChartDataset, DefaultDataPoint } from 'chart.js';
import { Stock } from './YahooFinance';

export type StockInfo = {
  id: string;
  latest: Stock;
  options: {
    labels: string[];
    dataset: ChartDataset<'line', DefaultDataPoint<'line'>>;
  };
};

export type Direction = 'up' | 'down' | 'none';
