import { Link, Route, Routes } from 'react-router-dom';
import CartStatus from './components/CartStatus';
import Products from './pages/Products';
import Cart from './pages/Cart';
import useLinkHelpers from '../../hooks/useLinkHelpers';

function Shop() {
  const { isActive, getClassName } = useLinkHelpers();
  return (
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
  );
}

export default Shop;
