import { createContext, useContext, useEffect, useState } from "react";
import { addProductAPI, fetchProductsAPI } from "../services/allAPI";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;

  // Derived: filtered products based on selected subcategories
  const filteredProducts =
    selectedSubcategories.length === 0
      ? products
      : products.filter((product) =>
          selectedSubcategories.includes(product.subcategory)
        );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchProducts = async (search = "") => {
    try {
      const data = await fetchProductsAPI(search);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addProduct = async (productData) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("subcategory", productData.subcategory);
      formData.append("price", productData.price);
      formData.append("variants", JSON.stringify(productData.variants));

      // Make sure images are real File objects, not URLs
      productData.images.forEach((imgFile) => {
        formData.append("images", imgFile); // must be File, not URL string
      });

      await addProductAPI(formData); // API call
      fetchProducts(); // refresh product list
      return true;
    } catch (err) {
      console.error("Add product failed:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm); // Load on initial mount
  }, [searchTerm]);

  return (
    <ProductContext.Provider
      value={{
        products,
        currentProducts,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalPages,
        setShowAddProduct,
        showAddProduct,
        addProduct,
        selectedSubcategories,
        setSelectedSubcategories, // expose filter setter
        searchTerm,
        setSearchTerm, // ✅
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
