# 🛍️ E-Commerce Product Management System

This is a full-stack E-Commerce Product Management System where users can view, filter, and add products to a wishlist, while authenticated admins can add categories, subcategories, and products (with images). The app includes secure JWT authentication and a responsive user interface.

---

## 📖 Project Overview

This project is a scalable and secure e-commerce product management application built with the MERN stack (MongoDB, Express, React, Node.js). It allows:

- Users to manage products, categories, and subcategories
- Users to browse products, add them to wishlists, and filter/search items
- File upload for product images using `multipart/form-data`
- Secure access to protected routes using JWT token authentication

---

## ✨ Features

- ✅ JWT Authentication (Login, Protected Routes)
- ✅ Add Categories & Subcategories (Admin only)
- ✅ Add Products with Image Upload (Admin only)
- ✅ Filter Products by Subcategory
- ✅ Search Products by Name
- ✅ Add to Wishlist / Remove from Wishlist (User)
- ✅ View Wishlist in a side slider
- ✅ Responsive UI with Tailwind CSS
- ✅ Error handling and form validations

---

## ⚙️ Technologies Used

**Frontend:**

- React.js
- Tailwind CSS
- Axios
- React Context API

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Multer (for file/image upload)
- CORS, dotenv

---

## 📁 Project Structure

product-management-app/
├── frontend/ # React Frontend
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
├── backend/ # Express Backend
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/ # Image storage
│ ├── server.js
│ └── config/
├── .env
└── README.md

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/arshadcheruputhore/product-management-app.git
cd product-management-app

2. Backend Setup

cd backend
npm install

Create a .env file in the server directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start the backend server:
nodemon

cd ../frontend
npm install


Create a .env file in the client directory:
VITE_BASE_URL=http://localhost:5000


Start the frontend app:
npm run dev


🛠️ How to Run the Application
Make sure both frontend and backend servers are running:

Backend: http://localhost:5000

Frontend: http://localhost:5173 (default for Vite)

Login or register to get a JWT token saved in localStorage.

User operations (Add Product, Category, Subcategory) require login.

Browse products, filter by subcategory, or search by name.

Add items to your wishlist and view them in a slide-out panel.


🔐 Authentication Flow
After logging in, the JWT token is saved in localStorage.

All protected API calls attach the token via:
Authorization: Bearer <your_token>


📝 API Highlights
POST /auth/login – Login and get JWT

POST /categories/category – Add category (protected)

POST /categories/subCategory – Add subcategory (protected)

POST /products/add – Add product with images (protected)

GET /products?search=shoes – Search products

POST /wishlist – Add to wishlist

DELETE /wishlist/:id – Remove from wishlist


🙋‍♂️ Author
Developed by MOHAMMED ARSHAD