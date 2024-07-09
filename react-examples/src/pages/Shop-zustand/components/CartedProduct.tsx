import { ProductInCart } from '../types';
import { useCartStore } from '../stores/cart';

export type ProductProps = {
  product: ProductInCart;
};

function CartedProduct({ product }: ProductProps) {
  const updateItemInCart = useCartStore((store) => store.updateItemInCart);
  const removeItemFromCart = useCartStore((store) => store.removeItemFromCart);

  return (
    <article>
      <header>{product.title}</header>
      <div className="grid">
        <img alt={product.title} src={product.image} />
        <p>${product.price.toFixed(2)} USD</p>
        <p>{product.hasSize ? product.size : ''}</p>
        <label>
          Quantity
          <input
            value={product.quantity}
            onChange={(e) =>
              updateItemInCart(product.id, product.size, Number(e.target.value))
            }
            type="number"
            min="1"
          />
        </label>
        <div>
          <button
            className="secondary"
            type="button"
            onClick={() => removeItemFromCart(product.id, product.size)}
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartedProduct;
