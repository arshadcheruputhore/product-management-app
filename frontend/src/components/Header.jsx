import { Heart, ShoppingCart, LogIn } from "lucide-react";
import WishlistDrawer from "./WishlistDrawer";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";

export default function Header() {

  const [showDrawer, setShowDrawer] = useState(false);
  const {wishlist} = useWishlist()
  const { searchTerm, setSearchTerm } = useProduct();


  return (
    <>
      <header className="w-full bg-blue-900 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className=" sm:max-w-md relative sm:w-5/6 mx-auto bg-white rounded-full">
          <input
            type="text"
            placeholder="Search any things"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 rounded-full pl-6 pr-20 text-black outline-none border-none"
          />
          <button className="absolute -right-0.5 top-1/2 -translate-y-1/2 bg-yellow-500 text-white font-semibold rounded-full px-6 py-2.5 text-sm">
            Search
          </button>
        </div>
        <div className="flex items-center justify-end gap-7 sm:w-1/6">
          <div className="relative" onClick={() => setShowDrawer(true)}>
            <Heart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white font-semibold text-xs rounded-full px-1.5">
              {wishlist.length}
            </span>
          </div>
          <Link to={'/'} className="flex items-center gap-1">
            <LogIn className="w-5 h-5" /> Sign in
          </Link>
          <Link to={'/cart'} className="relative flex items-center gap-1">
            <ShoppingCart className="w-5 h-5" /> Cart
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white font-semibold text-xs rounded-full px-1.5">
              5
            </span>
          </Link>
        </div>
      </header>
  
      {/* Wishlist Drawer */}
      <WishlistDrawer open={showDrawer} onClose={() => setShowDrawer(false)} />
    </>
  );
}
