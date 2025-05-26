const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRoute");
app.use("/api/auth", authRoutes);

const categoryRoutes = require("./routes/categoryRoute");
app.use("/api/categories", categoryRoutes);

const productRoutes = require("./routes/productRoute");
app.use("/api/products", productRoutes);

const wishlistRoutes = require("./routes/wishlistRoute");
app.use("/api/wishlist", wishlistRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
