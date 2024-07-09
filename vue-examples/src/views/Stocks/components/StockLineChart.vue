<script setup lang="ts">
import { markRaw, ref, onMounted, onUnmounted } from 'vue';
import { Line } from 'vue-chartjs';
import type { Direction, LineChartDataset, StockInfo } from '../types';
import YahooFinance, { type Stock } from '../YahooFinance';
import { getDirection, lineChartOptions } from '../utils';
import Ticker from './Ticker.vue';

const props = defineProps<{
  color: string;
  ticker: string;
  onRemove: (ticker: string) => void;
}>();

const direction = ref<Direction>('none');
const info = ref<StockInfo | null>(null);

const data = ref<{ labels: string[]; datasets: LineChartDataset[] }>({
  labels: [],
  datasets: [],
});

const onUpdate = (update: Stock) => {
  const newLabel = new Date(update.time).toLocaleTimeString();
  if (info.value) {
    if (!info.value.options.labels.find((label) => label === newLabel)) {
      direction.value = getDirection(update.price - info.value.latest.price);
      info.value.latest = update;
      info.value.options.labels.push(newLabel);
      info.value.options.dataset.data.push({
        x: update.time,
        y: update.price,
      });
    }
  } else {
    info.value = {
      id: update.id,
      latest: update,
      options: {
        labels: [newLabel],
        dataset: {
          label: update.id,
          borderWidth: 1,
          pointStyle: 'triangle',
          backgroundColor: props.color,
          borderColor: props.color,
          data: markRaw([
            {
              x: update.time,
              y: update.price,
            },
          ]),
        },
      },
    };
  }

  // manually overwrite, computed not working...
  data.value = {
    labels: info.value.options.labels,
    datasets: [info.value.options.dataset],
  };
};

onMounted(async () => {
  YahooFinance.subscribe([props.ticker], onUpdate);
});

onUnmounted(() => {
  YahooFinance.unsubscribe([props.ticker], onUpdate);
});
</script>

<template>
  <article v-if="!info" :key="ticker" class="chart-container">
    <h3>{{ ticker }} | Loading...</h3>
    <progress></progress>
  </article>
  <article
    v-if="info"
    class="chart-container"
    :class="direction"
    :key="info.id"
  >
    <div class="between">
      <Ticker
        :key="ticker"
        :ticker="ticker"
        :latest="{ direction, stock: info.latest }"
      />
      <button type="button" @click="() => onRemove(info!.id)">Remove</button>
    </div>
    <Line :options="lineChartOptions" :data="data" />
  </article>
</template>
