<script setup lang="ts">
import { useRoute } from 'vue-router';
import CartStatus from './components/CartStatus.vue';
import { provideCart } from './providers/cart';

const route = useRoute();

provideCart();
</script>
<template>
  <div>
    <div class="grid" style="position: sticky; top: -1px">
      <RouterLink
        role="button"
        to="/shop/products"
        :class="{
          secondary: route.path === '/shop/products',
        }"
        :aria-current="route.path === '/shop/products'"
      >
        Products
      </RouterLink>
      <RouterLink
        role="button"
        to="/shop/cart"
        :class="{
          secondary: route.path === '/shop/cart',
        }"
        :aria-current="route.path === '/shop/cart'"
      >
        <CartStatus />
      </RouterLink>
    </div>
    <RouterView />
  </div>
</template>
