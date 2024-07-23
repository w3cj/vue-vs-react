<script setup lang="ts">
import { markRaw, ref, onMounted, onUnmounted } from 'vue';
import { Line } from 'vue-chartjs';
import type { Direction, LineChartDataset, StockInfo } from '../types';
import YahooFinance, { type Stock } from '../YahooFinance';
import { getDirection, lineChartOptions } from '../utils';
import Symbol from './Symbol.vue';

const { color, symbol, onRemove } = defineProps<{
  color: string;
  symbol: string;
  onRemove: (symbol: string) => void;
}>();

const direction = ref<Direction>('none');
const info = ref<StockInfo | null>(null);

const data = ref<{ labels: string[]; datasets: LineChartDataset[] }>({
  labels: [],
  datasets: [],
});

const createChartData = (stock: Stock, label: string) => ({
  id: stock.id,
  latest: stock,
  options: {
    labels: [label],
    dataset: {
      label: stock.id,
      borderWidth: 1,
      pointStyle: 'triangle',
      backgroundColor: color,
      borderColor: color,
      data: markRaw([
        {
          x: stock.time,
          y: stock.price,
        },
      ]),
    },
  },
});

const onUpdate = (update: Stock) => {
  const newLabel = new Date(update.time).toLocaleTimeString();
  if (info.value) {
    if (!info.value.options.labels.find((label) => label === newLabel)) return;
    direction.value = getDirection(update.price - info.value.latest.price);
    info.value.latest = update;
    info.value.options.labels.push(newLabel);
    info.value.options.dataset.data.push({
      x: update.time,
      y: update.price,
    });
  } else {
    info.value = createChartData(update, newLabel);
  }

  data.value = {
    labels: info.value.options.labels,
    datasets: [info.value.options.dataset],
  };
};

onMounted(async () => {
  YahooFinance.subscribe([symbol], onUpdate);
});

onUnmounted(() => {
  YahooFinance.unsubscribe([symbol], onUpdate);
});
</script>

<template>
  <article v-if="!info" :key="symbol" class="chart-container">
    <h3>{{ symbol }} | Loading...</h3>
    <progress></progress>
  </article>
  <article
    v-if="info"
    class="chart-container"
    :class="direction"
    :key="info.id"
  >
    <div class="between">
      <Symbol :key="symbol" :symbol="symbol" />
      <button type="button" @click="() => onRemove(info!.id)">Remove</button>
    </div>
    <Line :options="lineChartOptions" :data="data" />
  </article>
</template>
