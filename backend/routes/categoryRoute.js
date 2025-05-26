const express = require("express");
const router = express.Router();
const { addCategory, getCategories, addSubcategory } = require("../controllers/categoryController");
const authMiddleware = require('../middlewares/authMiddleware')

router.post("/category", authMiddleware, addCategory);
router.get("/category", getCategories);
router.post("/subCategory", authMiddleware, addSubcategory);

module.exports = router;
