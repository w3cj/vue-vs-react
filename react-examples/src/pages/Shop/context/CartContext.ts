import { createContext } from 'react';
import { CartContextType } from '../types';

export default createContext<CartContextType>({
  items: [],
  totalItems: 0,
  total: 0,
  removeItemFromCart: () => {},
  updateItemInCart: () => {},
  addToCart: () => {},
});
