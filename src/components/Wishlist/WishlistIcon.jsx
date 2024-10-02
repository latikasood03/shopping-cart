import { RiHeartAddLine, RiHeartAddFill } from "react-icons/ri";
import useWishlist from "../../hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import "./wishlistIcon.css";

const WishlistIcon = ({product}) => {
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const navigate = useNavigate();

    const isInWIshlist = wishlist.some(item => item.productId._id === product._id);

    const toggleWishlist = async () => {
        if(isInWIshlist) {
            removeFromWishlist(product._id);
        } else {
            await addToWishlist(product);
            navigate('/wishlist')
        }
    }

    return (
        <div>
            {
                isInWIshlist ? (
                    <RiHeartAddFill className="wl-btn filled" onClick={toggleWishlist}/>
                ) : (
                    <RiHeartAddLine className="wl-btn" onClick={toggleWishlist}/>
                )
            }
            
            
        </div>
    )
}

export default WishlistIcon
