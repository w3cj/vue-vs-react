import type { ChartDataset, DefaultDataPoint } from 'chart.js';
import type { Stock } from './YahooFinance';

export type LineChartDataset = ChartDataset<'line', DefaultDataPoint<'line'>>;

export type StockInfo = {
  id: string;
  latest: Stock;
  options: {
    labels: string[];
    dataset: LineChartDataset;
  };
};

export type Direction = 'up' | 'down' | 'none';

export type StockDirection = {
  stock: Stock;
  direction: Direction;
};
