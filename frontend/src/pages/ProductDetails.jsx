import React, { useState } from "react";
import { ChevronRight, Check, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useWishlist } from "../context/WishlistContext";
import { useProduct } from "../context/ProductContext";
const BASE_URL = import.meta.env.VITE_BASE_URL; // For Vite


export default function ProductDetails() {
  const [selectedRam, setSelectedRam] = useState("4 GB");
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { products } = useProduct(); // destructure the full product list

  const product = products.find((item) => item._id === id);

  // Assuming `product` is your current product
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white px-6 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to={"/home"} className="hover:underline">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>Product details</span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <div className="border border-black/30 rounded-xl p-4">
              <img
                src={`${BASE_URL}${product.images[0]}`}
                alt={product.name}
                className="w-full object-contain"
              />
            </div>

            <div className="flex gap-4 mt-4">
              {product.images.slice(1, 4).map((img, i) => (
                <div key={i} className="border border-black/30 rounded-lg p-2 w-1/2">
                  <img
                    src={`${BASE_URL}${img}`}
                    alt={`Thumb ${i + 1}`}
                    className="w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-blue-900 font-semibold text-2xl">
              {product.name}
            </h2>
            <p className="text-gray-800 text-2xl font-bold">${product.price}</p>

            <div className="space-y-1">
              <p className="font-medium">
                Availability:{" "}
                <span className="text-green-600 inline-flex items-center gap-1">
                  <Check className="w-4 h-4" /> In stock
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Hurry up! only 34 product left in stock!
              </p>
            </div>

            <div className="space-y-2 border-t border-black/30 py-8 mt-8">
              <label className="block font-medium">Ram:</label>
              <div className="flex gap-2">
                {["4 GB", "8 GB", "16 GB"].map((ram) => (
                  <button
                    key={ram}
                    onClick={() => setSelectedRam(ram)}
                    className={`px-3 py-1 border rounded ${
                      selectedRam === ram
                        ? "bg-blue-900 text-white"
                        : "text-gray-700 bg-gray-100"
                    }`}
                  >
                    {ram}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Quantity:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange("dec")}
                  className="px-2 py-0.5 border rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("inc")}
                  className="px-2 py-0.5 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full">
                Edit product
              </button>
              <button className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full">
                Buy it now
              </button>
              <button
                className=" rounded-full p-2.5 bg-gray-100"
                onClick={() =>{
                  isWishlisted
                    ? removeFromWishlist(wishlist.find(w => w.product._id === id).id)
                    : addToWishlist(product);
              }}
              >
                <Heart
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
