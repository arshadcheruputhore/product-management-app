import { createContext, useContext, useEffect, useState } from "react";
import {
  addCategoryAPI,
  addSubcategoryAPI,
  getAllCategoriesAPI,
} from "../services/allAPI";

const CategoryContext = createContext();
export const useCategory = () => useContext(CategoryContext);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const [showAddCategory, setshowAddCategory] = useState(false);
  const [showAddSubCategory, setshowAddSubCategory] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategoriesAPI();
      setCategories(data);
    } catch (error) {
      console.error("Fetch categories failed", error);
    }
  };

  const addCategory = async (name) => {
    try {
      const newCat = await addCategoryAPI({ name });
      setCategories([...categories, newCat]);
      return { success: true, message: "Category added successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Category add failed",
      };
    }
  };

  const addSubcategory = async (categoryName, subcategoryName) => {
    try {
      const response = await addSubcategoryAPI({
        categoryName,
        subcategoryName,
      });

      // Update local state
      setCategories((prev) =>
        prev.map((cat) =>
          cat.name === categoryName
            ? { ...cat, subcategories: [...cat.subcategories, subcategoryName] }
            : cat
        )
      );

      return { success: true, message: "Subcategory added successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add subcategory",
      };
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        addSubcategory,
        setshowAddCategory,
        showAddCategory,
        showAddSubCategory,
        setshowAddSubCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
