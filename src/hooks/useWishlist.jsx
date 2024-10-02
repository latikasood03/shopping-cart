import { useEffect, useState } from "react";

const useWishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:8080/prod/wishlist', {
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                    }
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch wishlist items.');
                }

                const resData = await res.json();
                setWishlist(resData.products || []);
            } catch(err) {
                console.log(err);
            }
        }
        fetchWishlist();
    }, [])

    const addToWishlist = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/prod/wishlist', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({ prodId: product._id, product }),
            })

            if (!res.ok) {
                throw new Error('Failed to add product to wishlist.');
            }

            const resData = await res.json();
            setWishlist(resData.wishlist.items || []);
        } catch(err) {
            console.log(err);
        }
    }

    const removeFromWishlist = async (prodId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/prod/wishlist-delete/${prodId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                }
            })

            if (!res.ok) {
                throw new Error('Failed to remove product from wishlist.');
            }

            await res.json();
            setWishlist(res => res.filter(item => item.productId._id !== prodId));
        } catch(err) {
            console.log(err);
        }
    }

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist
    };
}

export default useWishlist;