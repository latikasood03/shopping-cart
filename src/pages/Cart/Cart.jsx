// // import { useNavigate } from "react-router-dom";
// import Button from "../../components/Button/Button";
// import { useState } from "react";
// // import "./productItem.css"


// const Cart = () => {
//     // const navigate = useNavigate();
//     const [products, setProducts] = useState([
//         {title: 'Book', description: 'good book', price: 20, id: 1},
//         {title: 'Chair', description: 'good chair', price: 200, id: 2}
//     ])

//     // const addToCartHandler = () => {
//     //     navigate("/cart");
//     // } 

//     return (
//         <div className="main-box">
//             <ul>
//                 {products.map(product => 
//                     <li key={product.id} className="product-card">
//                         <h1>{product.title}</h1>
//                         <p>${product.price}</p>
//                         <p>{product.quantity}</p>
//                         <Button className = "product-btn" >Checkout</Button>
//                     </li>
//                 )}
//             </ul>
//         </div>
//     )
// }

// export default Cart


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import Button from '../../components/Button/Button';

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Book', price: 20, quantity: 2 },
    { id: 2, title: 'Chair', price: 200, quantity: 1 }
  ]);

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No products in cart!</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <h2>{item.title}</h2>
                <p>Price: ${item.price}</p>
                <div className="quantity-controls">
                  <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                </div>
                <p>Subtotal: ${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>

          <hr />
          <div className="cart-summary">
            <h2>Total Price: ${totalPrice}</h2>
            <button className="checkout-btn" onClick={checkoutHandler}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

