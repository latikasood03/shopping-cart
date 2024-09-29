import { useState } from "react"

const Orders = () => {
    const [orders, setOrders] = useState([]);
    return (
        <div>
            {orders.length > 0 ? (
            <>
            <ul className="orders">
                {orders.map((order) => (
                <li className="order-item" key={order._id}>
                    <h1>
                    Order - # {order._id} -{' '}
                    </h1>
                    <ul className="orders-products">
                    {order.products.map((p) => (
                        <li
                        className="orders-products-item"
                        key={p.product._id}
                        >
                        {p.product.title} ({p.quantity})
                        </li>
                    ))}
                    </ul>
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
