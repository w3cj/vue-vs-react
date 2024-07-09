import { create } from 'zustand';
import { ProductInCart, ProductInfo, Size } from '../types';

export type CartStore = {
  items: ProductInCart[];
  totalItems: number;
  total: number;
  addToCart: (product: ProductInfo, size: Size, quantity: number) => void;
  updateItemInCart: (id: number, size: Size, quantity: number) => void;
  removeItemFromCart: (id: number, size: Size) => void;
};

const getTotalItems = (items: ProductInCart[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

const getTotal = (items: ProductInCart[]) =>
  items.reduce((total, item) => total + item.quantity * item.price, 0);

const createUpdate = (items: ProductInCart[]) => ({
  items,
  totalItems: getTotalItems(items),
  total: getTotal(items),
});

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalItems: 0,
  total: 0,
  removeItemFromCart: (id: number, size: Size) =>
    set((state) => {
      const items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
      return createUpdate(items);
    }),
  updateItemInCart: (id: number, size: Size, quantity: number) =>
    set((state) => {
      const items = state.items.map((item) => {
        if (item.id === id && item.size === size) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      });
      return createUpdate(items);
    }),
  addToCart: (product: ProductInfo, size: Size, quantity: number) =>
    set((state) => {
      const itemInCart = state.items.find(
        (item) => item.id === product.id && item.size === size
      );
      let items: ProductInCart[] = [];
      if (!itemInCart) {
        items = [...state.items, { ...product, quantity, size }];
      } else {
        items = state.items.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      }

      return createUpdate(items);
    }),
}));
