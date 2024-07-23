<script setup lang="ts">
import { ref } from 'vue';
import YahooFinance from '../YahooFinance';
import { nextTick } from 'vue';

const { onAdd, symbols } = defineProps<{
  onAdd: (symbol: string) => void;
  symbols: string[];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const error = ref<string>('');
const symbolLoading = ref(false);

const handleSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const symbol = formData.get('symbol') as string;
  const existingSymbols = new Set(symbols);
  if (existingSymbols.has(symbol)) {
    error.value = 'Symbol already exists';
    return;
  }
  symbolLoading.value = true;
  const quote = await YahooFinance.getQuote(symbol);
  symbolLoading.value = false;
  if (!quote) {
    error.value = 'Symbol not found.';
  } else {
    onAdd(symbol);
    form.reset();
  }
  nextTick(() => inputRef.value?.focus());
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Symbol
      <fieldset role="group">
        <input
          type="text"
          name="symbol"
          :disabled="symbolLoading"
          @input="error = ''"
          ref="inputRef"
          :aria-invalid="error ? true : undefined"
        />
        <button type="submit" :disabled="symbolLoading">
          {{ symbolLoading ? 'Loading...' : 'Add' }}
        </button>
      </fieldset>
      <small v-if="error">{{ error }}</small>
    </label>
  </form>
</template>
