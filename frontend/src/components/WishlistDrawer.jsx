import React from "react";
import { Heart, X } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function WishlistDrawer({ open, onClose }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  console.log("wishlist format is", wishlist);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
      )}

      <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
        <div
          className={`w-80 max-w-full h-full bg-white shadow-lg transform transition-transform duration-300 pointer-events-auto ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between bg-blue-900 text-white p-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white text-black p-1.5 ">
                <Heart size={26} />
              </span>
              <span className="font-semibold">Items</span>
            </div>
            <X className="cursor-pointer" onClick={onClose} />
          </div>

          <div className="p-4 space-y-5">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-black/40 pb-3"
              >
                <img
                  src={`${BASE_URL}${item.product.images[0]}`}
                  alt={item.product.name}
                  className="w-16 h-16"
                />
                <div className="flex-1 ml-3">
                  <p className="font-semibold text-blue-900 text-sm">
                    {item.product.name}
                  </p>
                  <p className="font-bold text-gray-800 text-sm">
                    {item.product.price}
                  </p>
                  <div className="flex text-gray-400 text-sm">★★★★★</div>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
