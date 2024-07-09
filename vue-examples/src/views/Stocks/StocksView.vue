<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import TickerMarquee from './components/TickerMarquee.vue';
import TickerForm from './components/TickerForm.vue';
import StockLineChart from './components/StockLineChart.vue';
import YahooFinance, { type Stock } from './YahooFinance';
import type { StockDirection, Direction } from './types';
import { getDirection, colors } from './utils';

const tickers = ref<string[]>([]);
const latest = ref<Map<string, StockDirection>>(new Map());

onMounted(() => {
  YahooFinance.init();
});

onUnmounted(() => {
  YahooFinance.close();
});

const onUpdate = (update: Stock) => {
  let direction: Direction = 'none';
  const info = latest.value.get(update.id);
  if (info) {
    direction = getDirection(update.price - info.stock.price);
  }
  latest.value.set(update.id, { direction, stock: update });
};

const addTicker = (ticker: string) => {
  tickers.value.push(ticker);
  YahooFinance.subscribe([ticker], onUpdate);
};

const removeTicker = (ticker: string) => {
  latest.value.delete(ticker);
  tickers.value = tickers.value.filter((i) => i !== ticker);
  YahooFinance.unsubscribe([ticker], onUpdate);
};
</script>

<template>
  <div class="stocks">
    <TickerMarquee :tickers="tickers" :latest="latest" />
    <TickerForm :tickers="tickers" @add="addTicker" />
    <div class="charts">
      <template v-if="tickers.length">
        <StockLineChart
          v-for="(ticker, index) in tickers"
          :key="ticker"
          :color="colors[index % colors.length]"
          :ticker="ticker"
          @remove="removeTicker"
        />
      </template>
      <article v-else class="chart-container">
        <p>Add a ticker to start watching.</p>
      </article>
    </div>
  </div>
</template>
