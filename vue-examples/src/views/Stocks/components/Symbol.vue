<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { Direction } from '../types';
import { directionIndicators, formatPrice, getDirection } from '../utils';
import YahooFinance, { type Stock } from '../YahooFinance';

const latest = ref<Stock | undefined>(undefined);
const direction = ref<Direction>('none');

const { symbol } = defineProps<{
  symbol: string;
}>();

const onUpdate = (update: Stock) => {
  if (update.price === latest.value?.price) return;
  if (latest.value) {
    direction.value = getDirection(update.price - latest.value.price);
  }
  latest.value = update;
};

onMounted(() => {
  YahooFinance.subscribe([symbol], onUpdate);
});

onUnmounted(() => {
  YahooFinance.unsubscribe([symbol], onUpdate);
});
</script>

<template>
  <span>
    {{ symbol }} |
    <span v-if="latest" class="price" :class="direction">
      {{ directionIndicators[direction] }}
      {{ formatPrice(latest.price) }}
    </span>
    <span v-else class="price"> Loading... </span>
  </span>
</template>
