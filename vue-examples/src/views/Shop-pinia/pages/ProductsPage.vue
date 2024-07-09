<script setup lang="ts">
import Product from '../components/Product.vue';
import products from '../data/products';
</script>
<template>
  <Product v-for="product in products" :key="product.id" :product="product" />
</template>
