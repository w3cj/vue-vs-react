import { useContext } from 'react';
import CartContext from '../context/CartContext';

function CartStatus() {
  const { total, totalItems } = useContext(CartContext);

  return (
    <div className="center-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-shopping-cart"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span>
        {totalItems > 0 ? (
          <span>
            {totalItems} - ${total.toFixed(2)}
          </span>
        ) : (
          'Cart is Empty'
        )}
      </span>
    </div>
  );
}

export default CartStatus;
