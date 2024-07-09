<script setup lang="ts">
import Ticker from './Ticker.vue';
import type { StockDirection } from '../types';

defineProps<{
  tickers: string[];
  latest: Map<string, StockDirection>;
}>();
</script>

<template>
  <div class="ticker">
    <Ticker
      v-for="ticker in tickers"
      :key="ticker"
      :ticker="ticker"
      :latest="latest.get(ticker)"
    />
  </div>
</template>
