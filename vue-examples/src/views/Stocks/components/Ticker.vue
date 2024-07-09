<script setup lang="ts">
import type { StockDirection } from '../types';
import { directionIndicators, formatPrice } from '../utils';

defineProps<{
  ticker: string;
  latest: StockDirection | undefined;
}>();
</script>

<template>
  <span className="symbol">
    {{ ticker }} |
    <span v-if="latest" class="price" :class="latest.direction">
      {{ directionIndicators[latest.direction]
      }}{{ formatPrice(latest.stock.price) }}
    </span>
    <span v-else class="price"> Loading... </span>
  </span>
</template>
