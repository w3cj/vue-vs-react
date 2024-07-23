<script setup lang="ts">
import Symbol from './Symbol.vue';

defineProps<{
  symbols: string[];
}>();
</script>

<template>
  <div class="symbols">
    <Symbol v-for="symbol in symbols" :key="symbol" :symbol="symbol" />
  </div>
</template>
