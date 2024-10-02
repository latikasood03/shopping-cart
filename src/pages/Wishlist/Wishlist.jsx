import Button from "../../components/Button/Button";
import "./wishlist.css"
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const Wishlist = () => {
    const navigate = useNavigate();
    const {addToCart} = useCart();
    const {wishlist, removeFromWishlist} = useWishlist();

    
    const addToCartHandler = async (product) => {
        await addToCart(product);
        navigate("/cart"); 
    };

    return (
        <div className="wishlist-container">
        <h1>Wishlist</h1>
        {wishlist.length > 0 ? (
            <div>
              {wishlist.map(item => (
                <div key={item._id} className="wishlist-item">
                  <h2>{item.productId.title}</h2>
                  <p>Price: ${item.productId.price}</p>
                  <p>Description: {item.productId.description}</p>
                  <Button className="wishlist-btn-cart" onClick={() => addToCartHandler(item.productId)}>Add To Cart</Button>
                  <Button className="wishlist-btn-del" onClick={() => removeFromWishlist(item.productId._id)}>␡</Button>
                  <hr/>
                </div>
                
              ))}
            </div>
        ) :  (
          <p>No products in wishlist!</p>
        )}
      </div>
    )
}

export default Wishlist


