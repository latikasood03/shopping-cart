import { useState } from "react"
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleAddProduct = async (e) => {
        e.preventDefault();
    
        const product = {
            title,
            price,
            description,
        };
    
        try {
            const res = await fetch("http://localhost:8080/prod/add-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
    
            if (res.ok) {
                await res.json();
                navigate('/products');

            } 
        } catch (err) {
            console.error(err);
        }
    };
    

    return (
        <div className="add-product-main-box">
            <h1>Add New Product</h1>
            <form onSubmit={handleAddProduct} className="add-product-form"> 
                <div className="add-product-input">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text"
                        id="title"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="add-product-input">
                    <label htmlFor="price">Price</label>
                    <input 
                        type="number"
                        id="price"
                        value={price}
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="add-product-input">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        type="text"
                        id="description"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="product-btn">Add Product</Button>
            </form>
        </div>
    )
}

export default AddProduct
