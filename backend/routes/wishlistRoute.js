const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const {getWishlistProducts, addToWishlist, removeFromWishlist} = require('../controllers/wishlistController')
const authMiddleware = require('../middlewares/authMiddleware')


// Get all wishlist items
router.get("/", getWishlistProducts);

// Add to wishlist
router.post("/", authMiddleware, addToWishlist);

// Remove from wishlist
router.delete("/:id", authMiddleware, removeFromWishlist);

module.exports = router;
