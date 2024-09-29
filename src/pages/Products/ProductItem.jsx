import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import "./productItem.css";
import useCart from "../../hooks/useCart";

const ProductItem = () => {
    const navigate = useNavigate();
    // const [products, setProducts] = useState([
    //     {title: 'Book', description: 'good book', price: 20, id: 1},
    //     {title: 'Chair', description: 'good chair', price: 200, id: 2},
    // ]);
    const [products, setProducts] = useState([]);
    const {addToCart} = useCart();

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const res = await fetch('http://localhost:8080/prod/products');

                const resData = await res.json();
                setProducts(resData.products);
            } catch(err) {
                console.log(err)
            }
        }

        fetchProducts();
    }, [])

    const addToCartHandler = async (product) => {
        // const newCartItem = { ...product};

        // setCart(prevCart => [...prevCart, newCartItem]);
        await addToCart(product);
        navigate("/cart"); 
    };

    return (
        <div className="main-box">
            <ul>
                {products.length > 0? (
                    products.map(product => 
                        <li key={product._id} className="product-card">
                            <h1>{product.title}</h1>
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                            <Button className = "product-btn" onClick={() => addToCartHandler(product)}>Add To Cart</Button>
                        </li>
                    )) : (
                        <h1>Fetching products...</h1>
                    )
                }
            </ul>
        </div>
    )
}

export default ProductItem
