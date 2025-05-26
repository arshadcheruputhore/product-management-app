import { Heart, HeartOff } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
const BASE_URL = import.meta.env.VITE_BASE_URL; // For Vite


export default function ProductGrid() {

  const { currentProducts } = useProduct();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();


  // ✅ Function to check if product is in wishlist
  const isWishlisted = (productId) =>
    wishlist.some((item) => item.product._id === productId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-3">
      {currentProducts.map((product) => (
        <div 
        key={product._id}
        onClick={() => navigate(`/product/${product._id}`)}
        className="border border-black/20 rounded-xl p-4 text-start relative">
          <img
            src={`${BASE_URL}${product.images[0]}`}
            alt={product.name}
            className="mx-auto mb-2"
          />
          <button
            className="absolute top-2 right-2 rounded-full p-2 bg-gray-100/80 z-10"
            onClick={(e) => {
              e.stopPropagation(); // prevent card click from triggering navigation
              isWishlisted(product._id)
                ? removeFromWishlist(wishlist.find(w => w.product._id === product._id).id)
                : addToWishlist(product);
            }}
          >
            {isWishlisted(product._id) ? (
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            ) : (
              <Heart className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <h3 className="font-medium text-blue-800">{product.name}</h3>
          <p className=" text-gray-800 font-semibold my-2">₹{product.price}</p>
          <div className="flex justify-start mt-1 gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-gray-400/80 text-xl">
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
