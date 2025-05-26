const Category = require("../models/Category");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Category name required" });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

exports.addSubcategory = async (req, res) => {
  const { categoryName, subcategoryName } = req.body;

  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: "Category not found" });

    if (category.subcategories.includes(subcategoryName)) {
      return res.status(400).json({ message: "Subcategory already exists" });
    }

    category.subcategories.push(subcategoryName);
    await category.save();

    res.status(200).json({ message: "Subcategory added", category });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
