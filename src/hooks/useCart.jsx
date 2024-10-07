import { useState, useEffect } from 'react';

const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('https://shopping-cart-backend-q9h2.onrender.com/prod/cart', {
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch the cart.');
                }

                const resData = await res.json();
                setCart(resData.products || []);
            } catch(err) {
                console.log(err);
            }
        }
        fetchCart();
    }, []);

    const addToCart = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://shopping-cart-backend-q9h2.onrender.com/prod/cart', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({ prodId: product._id, quantity: 1, product }),
            })
            if (!res.ok) {
                throw new Error('Failed to fetch the cart');
            }
            const resData = await res.json();
            console.log(resData)
            setCart(resData.cart.items);
        } catch(err) {
            console.log(err);
        }
    };

    const increaseQuantity = async (prodId) => {
        try {
            const token = localStorage.getItem('token');
            const product = cart.find(item => item.productId._id === prodId);

            if (!product) {
                throw new Error('Product not found in cart');
            }

            const newQuantity = product.quantity + 1;

            const res = await fetch(`https://shopping-cart-backend-q9h2.onrender.com/prod/cart-qty/${prodId}`, {
                method: 'PUT',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({ quantity: newQuantity })
              })

            if (!res.ok) {
                throw new Error('Failed to fetch the cart');
            }
            const resData = await res.json();
            setCart(resData.cart.items);
        } catch(err) {
            console.log(err);
        }
    };

    const decreaseQuantity = async (prodId) => {
        try {
            const token = localStorage.getItem('token');
            const product = cart.find(item => item.productId._id === prodId);

            if (!product) {
                throw new Error('Product not found in cart');
            }

            const newQuantity =  product.quantity > 1 ? product.quantity - 1 : 1;

            const res = await fetch(`https://shopping-cart-backend-q9h2.onrender.com/prod/cart-qty/${prodId}`, {
                method: 'PUT',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({ quantity: newQuantity })
              })

            if (!res.ok) {
                throw new Error('Failed to fetch the cart');
            }
            const resData = await res.json();
            setCart(resData.cart.items);
        } catch(err) {
            console.log(err);
        }
    };

    const removeFromCart = async (prodId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`https://shopping-cart-backend-q9h2.onrender.com/prod/cart-delete/${prodId}`, {
                method: 'DELETE',
                headers: {
                  "Authorization": `Bearer ${token}`, 
                }
              })
            
              if(!res.ok) {
                throw new Error('Failed to fetch the cart');
              }
            await res.json();
            setCart(res => res.filter(item => item.productId._id !== prodId));
            
        } catch(err) {
            console.log(err)
        }
    };

    return {
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    };
};

export default useCart;
