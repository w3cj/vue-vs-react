<script setup lang="ts">
import { ref } from 'vue';
import YahooFinance from '../YahooFinance';
import { nextTick } from 'vue';

const props = defineProps<{
  onAdd: (ticker: string) => void;
  tickers: string[];
}>();

const ticker = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const error = ref<string>('');
const tickerLoading = ref(false);

const handleSubmit = async () => {
  const existingTickers = new Set(props.tickers);
  if (existingTickers.has(ticker.value)) {
    error.value = 'Ticker already exists';
    return;
  }
  tickerLoading.value = true;
  const quote = await YahooFinance.getQuote(ticker.value);
  tickerLoading.value = false;
  if (!quote) {
    error.value = 'Ticker not found.';
  } else {
    props.onAdd(ticker.value);
    ticker.value = '';
  }
  nextTick(() => inputRef.value?.focus());
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Ticker
      <fieldset role="group">
        <input
          type="text"
          name="ticker"
          v-model="ticker"
          :disabled="tickerLoading"
          @input="error = ''"
          ref="inputRef"
          :aria-invalid="error ? true : undefined"
        />
        <button type="submit" :disabled="tickerLoading">
          {{ tickerLoading ? 'Loading...' : 'Add' }}
        </button>
      </fieldset>
      <small v-if="error">{{ error }}</small>
    </label>
  </form>
</template>
