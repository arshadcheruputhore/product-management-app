const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, subcategory, price, variants } = req.body;

    const imagePaths = req.files?.map(file => `/uploads/${file.filename}`) || [];

    const product = new Product({
      name,
      description,
      subcategory,
      price,
      variants: JSON.parse(variants), // assuming it's sent as JSON string
      images: imagePaths,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const search = req.query.search || "";

    const query = search
      ? { name: { $regex: search, $options: "i" } } // case-insensitive search
      : {};

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
