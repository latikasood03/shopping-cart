import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSuccess = async() => {
      try {
        const token = localStorage.getItem('token');

        // const params = new URLSearchParams(location.search);
        //     const sessionId = params.get('sessionId');

        //     console.log(sessionId)
        // if (!sessionId) {
        //     setMessage('Invalid session. No order placed.');
        //     return;
        // }

        const res = await fetch('http://localhost:8080/prod/checkout/success', {
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
        console.log(resData);
        setMessage(resData.message || 'Your order has been placed successfully!');
        
    } catch (err) {
        console.log(err);
        setMessage('Failed to confirm the order. Please try again.');
    }
};

fetchSuccess();
}, [location.search]);

const handleOrders = () => {
      navigate('/orders');
  };

  return (
    <div className="checkout-success-container">
      <h1>{message}</h1>
      {/* <p>Thank you for your purchase.</p> */}
      <button onClick={handleOrders}>View Orders</button>
    </div>
  );
};

export default CheckoutSuccess;
