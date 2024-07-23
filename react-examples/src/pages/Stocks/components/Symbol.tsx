import { useCallback, useEffect, useState } from 'react';
import { Direction } from '../types';
import { directionIndicators, formatPrice, getDirection } from '../utils';
import YahooFinance, { Stock } from '../YahooFinance';

export type SymbolProps = {
  symbol: string;
};

export default function Symbol({ symbol }: SymbolProps) {
  const [latest, setLatest] = useState<Stock | null>(null);
  const [direction, setDirection] = useState<Direction>('none');

  const onUpdate = useCallback((update: Stock) => {
    setLatest((current) => {
      if (update.price === current?.price) return current;
      if (current) {
        const newDirection = getDirection(update.price - current.price);
        setDirection(newDirection);
      }
      return update;
    });
  }, []);

  useEffect(() => {
    YahooFinance.subscribe([symbol], onUpdate);
    return () => {
      YahooFinance.unsubscribe([symbol], onUpdate);
    };
  }, [symbol, onUpdate]);

  return (
    <span>
      {symbol} |{' '}
      {latest ? (
        <span className={`price ${direction}`}>
          {directionIndicators[direction]}
          {formatPrice(latest.price)}
        </span>
      ) : (
        <span className="price">Loading...</span>
      )}
    </span>
  );
}
