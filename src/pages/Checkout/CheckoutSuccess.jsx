import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSuccess = async() => {
      const queryParams = new URLSearchParams(location.search);
      const sessionId = queryParams.get('sessionId');
      try {
        const token = localStorage.getItem('token');

        const res = await fetch(`https://shopping-cart-backend-q9h2.onrender.com/prod/checkout/success/${sessionId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          }
        });

        if (!res.ok) {
          throw new Error('Something went wrong!');
        }
        
        const resData = await res.json();
        setMessage(resData.message || 'Your order has been placed successfully!');
        
        navigate('/orders');
    } catch (err) {
        setMessage('Failed to confirm the order. Please try again.');
    }
};

fetchSuccess();
}, [navigate, location]);

const handleOrders = () => {
  };

  return (
    <div className="checkout-success-container">
      <h1>{message}</h1>
      <button onClick={handleOrders}>View Orders</button>
    </div>
  );
};

export default CheckoutSuccess;
