import { createContext } from 'use-context-selector';

import { CartContextType } from '../types';

export default createContext<CartContextType>({
  items: [],
  totalItems: 0,
  total: 0,
  removeItemFromCart: () => {},
  updateItemInCart: () => {},
  addToCart: () => {},
});
