import { useState } from "react";
import { useCategory } from "../context/CategoryContext";

export default function AddSubCategory({ onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const { categories, addSubcategory } = useCategory();

  const handleAddSubcategory = async () => {
    const result = await addSubcategory(selectedCategory, subCategoryName);
    if (result.success) {
      alert(result.message);
      setSelectedCategory("");
      setSubCategoryName("");
      onClose(); // ✅ Close modal on success
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-6">
          Add Sub Category
        </h2>

        <div className="space-y-5">
          {/* Select Category */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat, i) => (
                <option key={i} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category Input */}
          <div>
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter sub category name"
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg"
          >
            Discard
          </button>
          <button
            onClick={handleAddSubcategory}
            className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
