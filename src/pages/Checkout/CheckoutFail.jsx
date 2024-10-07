import { useNavigate } from 'react-router-dom';

const CheckoutFail = () => {
  const navigate = useNavigate();

  const handleReturnToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="checkout-cancel-container">
      <h1>Payment Failed</h1>
      <p>Your payment was cancelled. You can return to the cart and try again.</p>
      <button onClick={handleReturnToCart}>Return to Cart</button>
    </div>
  );
};

export default CheckoutFail;
