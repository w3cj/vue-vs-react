<script setup lang="ts">
import { ref } from 'vue';
import { type ProductInfo, type Size, sizes } from '../types';
import { useCartStore } from '../stores/cart';

defineProps<{
  product: ProductInfo;
}>();

const quantity = ref(1);
const size = ref<Size>('S');
const { addToCart } = useCartStore();
</script>
<template>
  <article>
    <header>{{ product.title }}</header>
    <div class="grid">
      <img :alt="product.title" :src="product.image" />
      <div>
        <p>${{ product.price.toFixed(2) }} USD</p>
        <label v-if="product.hasSize">
          Size
          <select v-model="size">
            <option v-for="item in sizes" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </label>
        <label>
          Quantity
          <input v-model.number="quantity" type="number" min="1" />
        </label>
        <p>{{ product.description }}</p>
        <div class="end">
          <button @click="addToCart(product, size, quantity)">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
