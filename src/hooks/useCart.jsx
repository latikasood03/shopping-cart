import { useState, useEffect } from 'react';

const useCart = () => {
    const [cart, setCart] = useState([]);

    // Save the cart to localStorage when it changes
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:8080/prod/cart', {
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch the cart.');
                }

                const resData = await res.json();
                setCart(resData.products || []); 
                console.log(resData.products)
            } catch(err) {
                console.log(err);
            }
        }
        fetchCart();
    }, []);

    const addToCart = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/prod/cart', {
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
            // console.log(resData)
            
            setCart(resData.cart.items);
        } catch(err) {
            console.log(err);
        }
    };

    const increaseQuantity = (prodId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.productId._id === prodId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (prodId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.productId._id === prodId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeFromCart = async (prodId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/prod/cart-delete/${prodId}`, {
                method: 'DELETE',
                headers: {
                  "Authorization": `Bearer ${token}`, 
                }
              })
            
              if(!res.ok) {
                throw new Error('Failed to fetch the cart');
              }
            const resData = await res.json();
            console.log(resData)
            setCart(resData => resData.filter(item => item.productId._id !== prodId));
            
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
