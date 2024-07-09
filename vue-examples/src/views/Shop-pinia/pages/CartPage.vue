<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CartedProduct from '../components/CartedProduct.vue';
import { useCartStore } from '../stores/cart';

const store = useCartStore();
const { items, total, totalItems } = storeToRefs(store);
</script>
<template>
  <div v-if="totalItems > 0">
    <CartedProduct
      v-for="product in items"
      :key="`${product.id}-${product.size}`"
      :product="product"
    />
    <div class="end">Total: ${{ total.toFixed(2) }} USD</div>
  </div>
  <h3 v-else>Cart is Empty</h3>
</template>
