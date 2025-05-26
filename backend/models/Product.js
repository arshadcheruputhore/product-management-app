const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  ram: String,
  price: Number,
  qty: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  subcategory: String,
  price: Number,
  variants: [variantSchema],
  images: [String], // store image filenames/URLs
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
