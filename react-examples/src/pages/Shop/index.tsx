import { useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CartStatus from './components/CartStatus';
import CartContext from './context/CartContext';
import { CartContextType, ProductInCart } from './types';
import Products from './pages/Products';
import Cart from './pages/Cart';
import useLinkHelpers from '../../hooks/useLinkHelpers';

function Shop() {
  const { isActive, getClassName } = useLinkHelpers();
  const [items, setItems] = useState<ProductInCart[]>([]);
  const cartContext = useMemo<CartContextType>(
    () => ({
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      removeItemFromCart: (id, size) => {
        setItems((prev) =>
          prev.filter((item) => !(item.id === id && item.size === size))
        );
      },
      updateItemInCart: (id, size, quantity) => {
        setItems((prev) =>
          prev.map((item) => {
            if (item.id === id && item.size === size) {
              return {
                ...item,
                quantity,
              };
            }
            return item;
          })
        );
      },
      addToCart: (product, size, quantity) => {
        setItems((prev) => {
          const itemInCart = prev.find(
            (item) => item.id === product.id && item.size === size
          );
          if (!itemInCart) {
            return [...prev, { ...product, quantity, size }];
          }
          return prev.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + quantity,
              };
            }
            return item;
          });
        });
      },
    }),
    [items]
  );
  return (
    <CartContext.Provider value={cartContext}>
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
