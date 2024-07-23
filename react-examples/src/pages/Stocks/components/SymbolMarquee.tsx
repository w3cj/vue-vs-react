import Symbol from './Symbol';

export type SymbolMarqueeProps = {
  symbols: string[];
};

export default function SymbolMarquee({ symbols }: SymbolMarqueeProps) {
  return (
    <div className="symbols">
      {symbols.map((symbol) => (
        <Symbol key={symbol} symbol={symbol} />
      ))}
    </div>
  );
}
