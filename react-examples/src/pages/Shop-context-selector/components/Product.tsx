import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import CartContext from '../context/CartContext';
import { ProductInfo, Size, sizes } from '../types';

export type ProductProps = {
  product: ProductInfo;
};

function Product({ product }: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<Size>('S');
  const addToCart = useContextSelector(
    CartContext,
    (context) => context.addToCart
  );
  return (
    <article>
      <header>{product.title}</header>
      <div className="grid">
        <img alt={product.title} src={product.image} />
        <div>
          <p>${product.price.toFixed(2)} USD</p>
          {product.hasSize && (
            <label>
              Size
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as Size)}
              >
                {sizes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            Quantity
            <input
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              type="number"
              min="1"
            />
          </label>
          <p>{product.description}</p>
          <div className="end">
            <button
              type="button"
              onClick={() => addToCart(product, size, quantity)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Product;
