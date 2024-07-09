import CartedProduct from '../components/CartedProduct';
import { useCartStore } from '../stores/cart';

function Cart() {
  const { items, total, totalItems } = useCartStore();
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
