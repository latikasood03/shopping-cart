import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";



const ProductItem = () => {
    const navigate = useNavigate();

    const addToCarthandler = () => {
        navigate("/cart");
    } 


    return (
        <div>
            <h1>Product 1</h1>
            <Button onClick={addToCarthandler}>Add To Cart</Button>
        </div>
    )
}

export default ProductItem
