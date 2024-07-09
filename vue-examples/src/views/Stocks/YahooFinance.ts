import protobuf from 'protobufjs';
import { Buffer } from 'buffer';

export type Stock = {
  id: string;
  price: number;
  time: number;
  exchange: string;
  quoteType: number;
  marketHours: number;
  changePercent: number;
  dayVolume: number;
  change: number;
  priceHint: number;
};

export interface QuoteResponse {
  quote: Quote;
}

export interface Quote {
  exchange: string;
  shortname: string;
  quoteType: string;
  symbol: string;
  index: string;
  score: number;
  typeDisp: string;
  longname: string;
  exchDisp: string;
  sector: string;
  sectorDisp: string;
  industry: string;
  industryDisp: string;
  dispSecIndFlag: boolean;
  isYahooFinance: boolean;
}

export type StockUpdateCallback = (update: Stock) => void;

type YahooFinanceState = {
  connected: boolean;
  listeners: Map<string, StockUpdateCallback[]>;
  ws: WebSocket | null;
  Yaticker: protobuf.Type | null;
  waiting: { stockSymbols: string[]; onUpdate: StockUpdateCallback }[];
};

const state: YahooFinanceState = {
  connected: false,
  listeners: new Map<string, StockUpdateCallback[]>(),
  ws: null,
  Yaticker: null,
  waiting: [],
};

async function subscribe(
  stockSymbols: string[],
  onUpdate: StockUpdateCallback
) {
  if (!state.connected) {
    state.waiting.push({ stockSymbols, onUpdate });
    return;
  }
  const newTickers = stockSymbols.filter(
    (symbol) => !state.listeners.get(symbol)
  );
  if (newTickers.length) {
    state.ws?.send(
      JSON.stringify({
        subscribe: newTickers,
      })
    );
  }
  stockSymbols.forEach((symbol) => {
    const listenerCallbacks = state.listeners.get(symbol) || [];
    listenerCallbacks.push(onUpdate);
    state.listeners.set(symbol, listenerCallbacks);
  });
}

async function unsubscribe(
  stockSymbols: string[],
  onUpdate: StockUpdateCallback
) {
  stockSymbols.forEach((symbol) => {
    const callbacks = (state.listeners.get(symbol) || []).filter(
      (callback) => callback !== onUpdate
    );
    if (callbacks.length === 0) {
      state.listeners.delete(symbol);
    } else {
      state.listeners.set(symbol, callbacks);
    }
  });
  const emptyTickers = stockSymbols.filter(
    (symbol) => !state.listeners.get(symbol)
  );
  if (emptyTickers.length && state.connected) {
    state.ws?.send(
      JSON.stringify({
        unsubscribe: emptyTickers,
      })
    );
  }
}

function close() {
  state.ws?.close();
  state.connected = false;
  state.ws = null;
  state.Yaticker = null;
  state.listeners = new Map<string, StockUpdateCallback[]>();
  state.waiting = [];
}

async function init() {
  if (state.connected) return true;
  let wsResolve: (value: unknown) => void = () => {};
  const wsPromise = new Promise((res) => {
    wsResolve = res;
  });
  if (state.ws === null) {
    state.ws = new WebSocket('wss://streamer.finance.yahoo.com');

    state.ws.onopen = function onOpen() {
      state.connected = true;
      if (state.waiting.length) {
        state.waiting.forEach(({ stockSymbols, onUpdate }) => {
          subscribe(stockSymbols, onUpdate);
        });
        state.waiting = [];
      }
      wsResolve(true);
    };

    state.ws.onclose = function onClose() {
      state.connected = false;
    };

    state.ws.onmessage = function incoming(message) {
      if (state.Yaticker === null) return;
      const update = state.Yaticker.decode(
        Buffer.from(message.data, 'base64')
      ) as unknown as Stock;
      state.listeners.get(update.id)?.forEach((callback) => {
        callback(update);
      });
    };
  } else {
    wsResolve(true);
  }
  if (state.Yaticker !== null) return true;

  const protoPromise = new Promise((resolve, reject) => {
    protobuf.load('./YPricingData.proto', (error, root) => {
      if (error || !root) {
        return reject(error);
      }
      state.Yaticker = root.lookupType('yaticker');
      return resolve(true);
    });
  });

  await Promise.all([protoPromise, wsPromise]);
  return true;
}

async function getQuote(symbol: string) {
  try {
    const response = await fetch(
      'https://stock-quote-search.deno.dev?q=' + symbol
    );
    if (!response.ok) {
      return { quote: null };
    }
    const json = (await response.json()) as QuoteResponse;
    return json.quote;
  } catch (error) {
    return { quote: null };
  }
}

export default {
  init,
  close,
  subscribe,
  unsubscribe,
  getQuote,
};
