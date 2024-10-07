import { useEffect, useState } from "react"
import Button from "../../components/Button/Button";
import "./checkout.css";

import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PxK8IBlNf9eVVqTlJb8o3wqVTuF3f1nydCOynJgs6dBYQDMy6WD1Ntml21fmKt2hto75TTecU3mpOrEjZv0TAtJ00zYAPnCG1')

const Checkout = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalSum, setTotalSum] =useState(0);

    useEffect(() => {
        const fetchCart = async() => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`https://shopping-cart-backend-q9h2.onrender.com/prod/cart`, {
                    headers: {
                      "Authorization": `Bearer ${token}`,
                    }
                  }
                );

                if (!res.ok) {
                    throw new Error('Failed to fetch cart');
                  }
          
                  const resData = await res.json();
                  setCartProducts(resData.products);
                  calculateTotal(resData.products);
            } catch(err) {
                console.log(err);
            }
        }

        fetchCart();
    }, [])

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
        setTotalSum(total);
      };

    const handleCheckout = async() => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://shopping-cart-backend-q9h2.onrender.com/prod/checkout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch cart');
            }

            const data = await res.json();
            const stripe = await stripePromise;

            const { error } = await stripe.redirectToCheckout({
                sessionId: data.sessionId,
              });
        
              if (error) {
                console.error('Stripe error:', error.message);
              }
        
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="checkout-container">
            <div>
                {cartProducts.length > 0 ? (
                    cartProducts.map((item) => (
                      <div className="checkout-item" key={item.productId._id}>
                        <h1>{item.productId.title}</h1>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.productId.price}</p>
                      </div>
                    ))
                ) : (
                    <p>No products for checkout!</p>
                )}
            </div>
            <hr />
            <div className="checkout-btn-container">
                <h2>Total: ${totalSum.toFixed(2)}</h2>
                <Button className="checkout-btn" onClick={handleCheckout}>Order Now</Button>
            </div>
        </div>
    )
}

export default Checkout
