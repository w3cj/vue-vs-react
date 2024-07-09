import { ProductInfo, Size, ProductInCart } from '../types';

export type CartAddItemAction = {
  type: 'ADD_ITEM';
  data: {
    product: ProductInfo;
    size: Size;
    quantity: number;
  };
};

export type CartUpdateItemAction = {
  type: 'UPDATE_ITEM';
  data: {
    id: number;
    size: Size;
    quantity: number;
  };
};

export type CartRemoveItemAction = {
  type: 'REMOVE_ITEM';
  data: {
    id: number;
    size: Size;
  };
};

export type CartActions =
  | CartAddItemAction
  | CartUpdateItemAction
  | CartRemoveItemAction;

export function CartReducer(
  items: ProductInCart[],
  action: CartActions
): ProductInCart[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, quantity } = action.data;
      const itemInCart = items.find(
        (item) => item.id === product.id && item.size === size
      );
      if (!itemInCart) {
        return [
          ...items,
          {
            ...product,
            quantity,
            size,
          },
        ];
      }
      return items.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
    }
    case 'REMOVE_ITEM': {
      const { id, size } = action.data;
      return items.filter((item) => !(item.id === id && item.size === size));
    }
    case 'UPDATE_ITEM': {
      const { id, size, quantity } = action.data;
      return items.map((item) => {
        if (item.id === id && item.size === size) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      });
    }
    default:
      return items;
  }
}
