const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // optional if you implement auth
    required: false,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
