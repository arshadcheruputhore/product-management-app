import { commonAPI } from "./commonAPI";

// Register new user
export const registerAPI = async (userData) =>
  await commonAPI("POST", "/auth/register", userData);

// Login existing user
export const loginAPI = async (credentials) =>
  await commonAPI("POST", "/auth/login", credentials);

export const addCategoryAPI = async (data) => {
  const token = localStorage.getItem("token");  

  return await commonAPI("POST", "/categories/category", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllCategoriesAPI = async () => {
  return await commonAPI("get", "/categories/category");
};

export const addSubcategoryAPI = (data) => {
  const token = localStorage.getItem("token");

  return commonAPI("POST", "/categories/subCategory", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addProductAPI = async (data) => {
  const token = localStorage.getItem("token");

  return await commonAPI("POST", `/products/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchProductsAPI = async (search = "") => {
  return await commonAPI("get", "/products", {}, {params: { search }});
};

// Wishlist APIs
export const fetchWishlistAPI = async () => {
  return await commonAPI("get", "/wishlist");
} 

export const addToWishlistAPI = async (productId) => {
  const token = localStorage.getItem("token");

  return await commonAPI("post", "/wishlist", { productId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFromWishlistAPI = async (wishlistId) => {
  const token = localStorage.getItem("token");

  return await commonAPI("delete", `/wishlist/${wishlistId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
