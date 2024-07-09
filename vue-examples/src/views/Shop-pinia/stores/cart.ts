import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import type { ProductInCart, Size, ProductInfo } from '../types';

export const useCartStore = defineStore('cart', () => {
  const items = reactive<ProductInCart[]>([]);

  const totalItems = computed(() =>
    items.reduce((total, item) => total + item.quantity, 0)
  );

  const total = computed(() =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const removeItemFromCart = (id: number, size: Size) => {
    const foundIndex = items.findIndex(
      (item) => item.id === id && item.size === size
    );
    if (foundIndex !== -1) {
      items.splice(foundIndex, 1);
    }
  };

  const updateItemInCart = (id: number, size: Size, quantity: number) => {
    const foundIndex = items.findIndex(
      (item) => item.id === id && item.size === size
    );
    if (foundIndex !== -1) {
      items[foundIndex].quantity = quantity;
    }
  };

  const addToCart = (product: ProductInfo, size: Size, quantity: number) => {
    const foundIndex = items.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    if (foundIndex !== -1) {
      items[foundIndex].quantity += quantity;
    } else {
      items.push({ ...product, quantity, size });
    }
  };

  return {
    items,
    total,
    totalItems,
    addToCart,
    removeItemFromCart,
    updateItemInCart,
  };
});
