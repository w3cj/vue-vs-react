<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SymbolMarquee from './components/SymbolMarquee.vue';
import SymbolForm from './components/SymbolForm.vue';
import StockLineChart from './components/StockLineChart.vue';
import YahooFinance from './YahooFinance';
import { colors } from './utils';

const symbols = ref<string[]>([]);

onMounted(() => {
  YahooFinance.init();
});

onUnmounted(() => {
  YahooFinance.close();
});

const addSymbol = (symbol: string) => {
  symbols.value.push(symbol);
};

const removeSymbol = (symbol: string) => {
  symbols.value = symbols.value.filter((i) => i !== symbol);
};
</script>

<template>
  <div class="stocks">
    <SymbolMarquee :symbols="symbols" />
    <SymbolForm :symbols="symbols" @add="addSymbol" />
    <div class="charts">
      <template v-if="symbols.length">
        <StockLineChart
          v-for="(symbol, index) in symbols"
          :key="symbol"
          :color="colors[index % colors.length]"
          :symbol="symbol"
          @remove="removeSymbol"
        />
      </template>
      <article v-else class="chart-container">
        <p>Add a symbol to start watching.</p>
      </article>
    </div>
  </div>
</template>
