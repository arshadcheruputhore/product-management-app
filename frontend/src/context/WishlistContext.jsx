import React, { createContext, useContext, useEffect, useState } from "react";
import { addToWishlistAPI, fetchWishlistAPI, removeFromWishlistAPI } from "../services/allAPI";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const data = await fetchWishlistAPI();
    setWishlist(data.map(item => ({
      id: item._id,
      product: item.productId,
    })));
  };

  const addToWishlist = async (product) => {
    try {
      await addToWishlistAPI(product._id);
      fetchWishlist(); // Refresh
    } catch (error) {
      console.error("Add to wishlist failed:", error);
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      await removeFromWishlistAPI(wishlistId);
      fetchWishlist(); // Refresh
    } catch (error) {
      console.error("Remove from wishlist failed:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
