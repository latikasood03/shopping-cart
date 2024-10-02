import { useState } from "react"
import Button from "../../components/Button/Button";
import "./checkout.css";

const Checkout = () => {
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    const [totalSum, setTotalSum] =useState(0);
    return (
        <div className="checkout-container">
            <div>
                {checkoutProducts.length > 0 ? (
                    checkoutProducts.map((p) => (
                      <div className="checkout-item" key={p.productId._id}>
                        <h1>{p.productId.title}</h1>
                        <h2>Quantity: {p.quantity}</h2>
                      </div>
                    ))
                ) : (
                    <p>No products for checkout!</p>
                )}
            </div>
            <hr />
            <div className="checkout-btn-container">
                <h2>Total: ${totalSum.toFixed(2)}</h2>
                <Button className="checkout-btn">Order Now</Button>
            </div>
        </div>
    )
}

export default Checkout
