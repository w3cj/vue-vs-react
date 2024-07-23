import { useRef, useState } from 'react';
import YahooFinance from '../YahooFinance';

export type SymbolFormProps = {
  symbols: string[];
  addSymbol: (symbol: string) => void;
};

export default function SymbolForm({ symbols, addSymbol }: SymbolFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>('');
  const [symbolLoading, setSymbolLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const symbol = formData.get('symbol') as string;
    const existingSymbols = new Set(symbols);
    if (existingSymbols.has(symbol)) {
      setError('Symbol already exists');
      return;
    }
    setSymbolLoading(true);
    const quote = await YahooFinance.getQuote(symbol);
    setSymbolLoading(false);
    if (!quote) {
      setError('Symbol not found.');
    } else {
      addSymbol(symbol);
      form.reset();
    }
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Symbol
        <fieldset role="group">
          <input
            type="text"
            name="symbol"
            disabled={symbolLoading}
            onChange={() => setError('')}
            ref={(el) => {
              inputRef.current = el;
            }}
            aria-invalid={error ? true : undefined}
          />
          <button type="submit" disabled={symbolLoading}>
            {symbolLoading ? 'Loading...' : 'Add'}
          </button>
        </fieldset>
        {error && <small>{error}</small>}
      </label>
    </form>
  );
}
