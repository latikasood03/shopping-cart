import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import "./productItem.css";
import useCart from "../../hooks/useCart";
import WishlistIcon from "../../components/Wishlist/WishlistIcon";

const ProductItem = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(6);
    
    const navigate = useNavigate();

    const { addToCart } = useCart();
    
    useEffect(() => {
        const fetchProducts = async(page = 1) => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`http://localhost:8080/prod/products?page=${page}&limit=${limit}`, {
                    headers: {
                      "Authorization": `Bearer ${token}`,
                    }
                  }
                );

                const resData = await res.json();
                setProducts(resData.products);
                setCurrentPage(resData.currentPage);
                setTotalPages(resData.totalPages);
            } catch(err) {
                console.log(err)
            }
        }

        fetchProducts(currentPage);
    }, [currentPage, limit])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const addToCartHandler = async (product) => {
        await addToCart(product);
        navigate("/cart"); 
    };

    const deleteProductHandler = async (prodId) => {
        try{
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/prod/delete-product/${prodId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                  }
            });
            await res.json();
            setProducts(res => res.filter(item => item._id !== prodId));
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="main-box">
                {products.length > 0 ? (
                    products.map(product => 
                        <div key={product._id} className="product-card">
                            <h1>{product.title}</h1>
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                            <Button className = "product-btn" onClick={() => addToCartHandler(product)}>Add To Cart</Button>
                            <WishlistIcon product={product}/>
                            <Button className="del-btn" onClick={() => deleteProductHandler(product._id)}>␡</Button>
                        </div>
                    )) : (
                        <h1>Fetching products...</h1>
                    )
                }
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? "active" : ""}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        </>
    )
}

export default ProductItem
