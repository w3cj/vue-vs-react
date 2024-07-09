import { useCallback, useMemo, useReducer } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CartStatus from './components/CartStatus';
import CartContext from './context/CartContext';
import { CartContextType, ProductInfo, Size } from './types';
import Products from './pages/Products';
import Cart from './pages/Cart';
import useLinkHelpers from '../../hooks/useLinkHelpers';
import { CartReducer } from './reducers/CartReducer';

const useCartContext = () => {
  const [items, dispatch] = useReducer(CartReducer, []);
  const removeItemFromCart = useCallback(
    (id: number, size: Size) => {
      dispatch({
        type: 'REMOVE_ITEM',
        data: { id, size },
      });
    },
    [dispatch]
  );
  const updateItemInCart = useCallback(
    (id: number, size: Size, quantity: number) => {
      dispatch({
        type: 'UPDATE_ITEM',
        data: {
          id,
          size,
          quantity,
        },
      });
    },
    [dispatch]
  );
  const addToCart = useCallback(
    (product: ProductInfo, size: Size, quantity: number) => {
      dispatch({
        type: 'ADD_ITEM',
        data: {
          product,
          size,
          quantity,
        },
      });
    },
    [dispatch]
  );
  return useMemo<CartContextType>(
    () => ({
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      removeItemFromCart,
      updateItemInCart,
      addToCart,
    }),
    [items, removeItemFromCart, updateItemInCart, addToCart]
  );
};

function Shop() {
  const { isActive, getClassName } = useLinkHelpers();
  return (
    <CartContext.Provider value={useCartContext()}>
      <div>
        <div className="grid" style={{ position: 'sticky', top: '-1px' }}>
          <Link
            role="button"
            className={getClassName('/shop/products')}
            aria-current={isActive('/shop/products')}
            to="/shop/products"
          >
            Products
          </Link>
          <Link
            role="button"
            className={getClassName('/shop/cart')}
            aria-current={isActive('/shop/cart')}
            to="/shop/cart"
          >
            <CartStatus />
          </Link>
        </div>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartContext.Provider>
  );
}

export default Shop;
