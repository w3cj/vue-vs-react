<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cart';

const store = useCartStore();
// const { total, totalItems } = store;
const { total, totalItems } = storeToRefs(store);
</script>
<template>
  <div class="center-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-shopping-cart"
    >
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
      ></path>
    </svg>
    <span v-if="totalItems > 0">
      {{ totalItems }} - ${{ total.toFixed(2) }}
    </span>
    <span v-else> Cart is Empty </span>
  </div>
</template>
