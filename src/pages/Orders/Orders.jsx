import { useEffect, useState } from "react";
import "./orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('https://rmyd02a2sk.execute-api.ca-central-1.amazonaws.com/orders', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const resData = await res.json();
                setOrders(resData);
            } catch (err) {
                console.log(err)
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            {orders.length > 0 ? (
            <>
            <ul className="orders-container">
                {orders.map((order) => (
                <li className="order-item" key={order._id}>
                    <h2>
                    Order - # {order._id} -{' '}
                    </h2>
                    <div className="orders-products">
                    {order.products.map((p) => (
                        <div
                        className="orders-products-item"
                        key={p.product._id}
                        >
                        {p.product.title} (Qty: {p.quantity})
                        </div>
                    ))}
                    </div>
                </li>
                ))}
            </ul>
            </>
      ) :  (
        <p>No orders yet!</p>
      )}
        </div>
    )
}

export default Orders
