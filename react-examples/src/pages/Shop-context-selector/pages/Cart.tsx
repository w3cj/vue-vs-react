import { useContextSelector } from 'use-context-selector';
import CartContext from '../context/CartContext';
import CartedProduct from '../components/CartedProduct';

function Cart() {
  const { items, total, totalItems } = useContextSelector(
    CartContext,
    ({ items, total, totalItems }) => ({ items, total, totalItems })
  );
  return totalItems > 0 ? (
    <>
      {items.map((product) => (
        <CartedProduct
          key={`${product.id}-${product.size}`}
          product={product}
        />
      ))}
      <div className="end">Total: ${total.toFixed(2)} USD</div>
    </>
  ) : (
    <h3>Cart is Empty</h3>
  );
}

export default Cart;
