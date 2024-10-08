import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { io } from "socket.io-client";

const Products = () => {
    useEffect(() => {
        // const socket = io("http://localhost:3000");
        const socket = io("https://shopping-cart-zlcb.onrender.com");

        socket.on('connect', () => {
            console.log('Connected to server');
          });
    }, [])

    return (
        <div>
            <ProductItem />
        </div>
    )
}

export default Products
