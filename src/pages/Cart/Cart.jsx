import React from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import Button from '../../components/Button/Button';
import useCart from '../../hooks/useCart';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  
  const totalPrice = cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);

  const checkoutHandler = () => {
    navigate('/checkout');
  };
//   const checkoutHandler = (product) => {
//     setCartItems((prevCart) => {
//         const existingProduct = prevCart.find(item => item._id === product.id);
//         if (existingProduct) {
//             return prevCart.map(item =>
//                 item._id === product.id
//                     ? { ...item, quantity: item.quantity + 1 }
//                     : item
//             );
//         } else {
//             return [...prevCart, { ...product, quantity: 1 }];
//         }
//     });
//     navigate('/checkout');
// };
  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <div>
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <h2>{item.productId.title}</h2>
                <p>Price: ${item.productId.price}</p>
                <div className="quantity-controls">
                  <Button onClick={() => decreaseQuantity(item.productId._id)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => increaseQuantity(item.productId._id)}>+</Button>
                </div>
                <p>Subtotal: ${item.productId.price * item.quantity}</p>
                <div className="btn-container">
                  <Button className="cart-btn" onClick={() => removeFromCart(item.productId._id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>

          <hr />
          <div className="cart-summary">
            <h2>Total Price: ${totalPrice}</h2>
            <Button className="cart-btn" onClick={checkoutHandler}>Proceed to Checkout</Button>
          </div>
        </>
      ) :  (
        <p>No products in cart!</p>
      )}
    </div>
  );
};

export default Cart;

