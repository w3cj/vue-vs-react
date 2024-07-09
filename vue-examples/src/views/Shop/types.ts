import type { ComputedRef, Reactive } from 'vue';

export const sizes = ['S', 'M', 'L', 'XL', '2XL'] as const;
export type Size = (typeof sizes)[number];

export type ProductInfo = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  hasSize: boolean;
};

export type ProductInCart = ProductInfo & {
  quantity: number;
  size: Size;
};

export type CartProvider = {
  items: Reactive<ProductInCart[]>;
  totalItems: ComputedRef<number>;
  total: ComputedRef<number>;
  addToCart: (product: ProductInfo, size: Size, quantity: number) => void;
  updateItemInCart: (id: number, size: Size, quantity: number) => void;
  removeItemFromCart: (id: number, size: Size) => void;
};
