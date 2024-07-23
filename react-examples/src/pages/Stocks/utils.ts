import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value: number | string) => {
          return formatPrice(value as number);
        },
      },
    },
  },
};

export const directionIndicators = {
  up: '▲',
  down: '▼',
  none: ' ',
};

export const getDirection = (change: number) => {
  return change === 0 ? 'none' : change > 0 ? 'up' : 'down';
};

export const colors = [
  '#6610f2',
  '#fd7e14',
  '#20c997',
  '#d63384',
  '#0dcaf0',
  '#ffc107',
  '#198754',
  '#dc3545',
  '#0d6efd',
];
