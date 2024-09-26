import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { io } from "socket.io-client";

const Products = () => {
    useEffect(() => {
        const socket = io("http://localhost:3000");

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
