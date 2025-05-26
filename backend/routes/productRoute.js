const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addProduct, getAllProducts } = require("../controllers/productController");
const upload = require('../middlewares/upload')
const authMiddleware = require('../middlewares/authMiddleware')


router.post("/add", authMiddleware, upload.array("images"), addProduct);
router.get("/", getAllProducts);

module.exports = router;
