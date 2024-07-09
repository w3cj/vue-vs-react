<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { type ProductInCart } from '../types';

defineProps<{
  product: ProductInCart;
}>();

const { updateItemInCart, removeItemFromCart } = useCartStore();
</script>
<template>
  <article>
    <header>{{ product.title }}</header>
    <div class="grid">
      <img :alt="product.title" :src="product.image" />
      <p>${{ product.price.toFixed(2) }} USD</p>
      <p>
        <span v-show="product.hasSize">{{ product.size }}</span>
      </p>
      <label>
        Quantity
        <input
          :value="product.quantity"
          @input="
            updateItemInCart(
              product.id,
              product.size,
              Number(($event.target as HTMLInputElement).value)
            )
          "
          type="number"
          min="1"
        />
      </label>
      <div>
        <button
          class="secondary"
          type="button"
          @click="removeItemFromCart(product.id, product.size)"
        >
          Remove From Cart
        </button>
      </div>
    </div>
  </article>
</template>
