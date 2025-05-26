const Wishlist = require("../models/Wishlist");

exports.getWishlistProducts = async (req, res) => {
  try {
    const wishlist = await Wishlist.find().populate("productId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

exports.addToWishlist = async (req, res) => {

  const {productId} = req.body;
  try {
    const exists = await Wishlist.findOne({ productId });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });

    const newItem = new Wishlist({ productId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to wishlist" });
  }  
};

exports.removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
