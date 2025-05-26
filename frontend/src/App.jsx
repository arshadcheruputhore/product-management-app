import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { ProductProvider } from "./context/ProductContext";
import ProductDetails from "./pages/ProductDetails";
import { WishlistProvider } from "./context/WishlistContext";
import { CategoryProvider } from "./context/CategoryContext";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/home"
          element={
            <ProductProvider>
              <WishlistProvider>
                <CategoryProvider>
                  <Home />
                </CategoryProvider>
              </WishlistProvider>
            </ProductProvider>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductProvider>
              <WishlistProvider>
                <ProductDetails />
              </WishlistProvider>
            </ProductProvider>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
