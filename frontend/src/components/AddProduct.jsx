import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext";

export default function AddProduct({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [variants, setVariants] = useState([{ ram: "", price: "", qty: 1 }]);
  const [images, setImages] = useState([]);

  const { addProduct, setShowAddProduct } = useProduct();
  const {categories} = useCategory()  

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]); // store File objects directly
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateVariant = (index, key, value) => {
    const updated = [...variants];
    updated[index][key] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: 1 }]);
  };

  const handleAdd = async () => {
    const newProduct = {
      name: title,
      description,
      subcategory,
      variants,
      images,
      price: variants[0]?.price || "0.00",
    };

    try {
      const success = await addProduct(newProduct); // Wait for API response
      if (success) {
        alert("Product added successfully!");
        onClose(); // Close modal
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl mx-4 rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-center text-xl font-semibold mb-6">Add Product</h2>

        <div className="space-y-6">
          {/* Title */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="sm:w-40 font-medium">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 w-full border rounded-lg px-4 py-2"
              placeholder="Product title"
            />
          </div>

          {/* Variants */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-start">
            <label className="sm:w-40 font-medium mt-1">Variants:</label>
            <div className="flex-1 space-y-3 w-full">
              {variants.map((variant, index) => (
                <div key={index} className="flex flex-wrap gap-3 items-end">
                  <div className="flex-1 min-w-[100px]">
                    <label className="text-sm font-medium block mb-1">RAM</label>
                    <input
                      type="text"
                      value={variant.ram}
                      onChange={(e) => updateVariant(index, "ram", e.target.value)}
                      className="w-full border px-2 py-1 rounded-lg"
                      placeholder="e.g. 8 GB"
                    />
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="text-sm font-medium block mb-1">Price</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, "price", e.target.value)}
                      className="w-full border px-2 py-1 rounded-lg"
                      placeholder="e.g. 599.99"
                    />
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="text-sm font-medium block mb-1">Qty</label>
                    <div className="flex border rounded-lg px-2 py-1 justify-between items-center gap-1">
                      <button
                        onClick={() =>
                          updateVariant(index, "qty", Math.max(1, variant.qty - 1))
                        }
                      >
                        −
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={variant.qty}
                        className="w-8 text-center bg-transparent outline-none"
                      />
                      <button
                        onClick={() => updateVariant(index, "qty", variant.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {variants.length > 1 && (
                    <button onClick={() => setVariants(variants.filter((_, i) => i !== index))}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addVariant}
                className="text-sm text-white bg-gray-800 px-3 py-1 rounded-lg mt-2"
              >
                <Plus className="w-4 h-4 inline mr-1" /> Add variant
              </button>
            </div>
          </div>

          {/* Subcategory */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="sm:w-40 font-medium">Sub category:</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="flex-1 w-full border px-4 py-2 rounded-lg"
            >
              <option value="" selected disabled>Select</option>
              {categories.flatMap((category) =>
                category?.subcategories.map((sub, subIndex) => (
                  <option key={subIndex} value={sub}>{sub}</option>
                ))
              )}  
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <label className="sm:w-40 font-medium">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 w-full border rounded-lg px-4 py-2 resize-none"
              rows="3"
              placeholder="Product description"
            />
          </div>

          {/* Upload Images */}
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="sm:w-40 font-medium">Upload image:</label>
            <div className="flex-1 flex gap-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative group w-20 h-20">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`upload-${i}`}
                    className="w-20 h-20 object-cover border rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/10 flex items-center justify-center text-white opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5 text-red-600 font-semibold" />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 border border-dashed flex items-center justify-center rounded-lg-full cursor-pointer text-gray-500">
                +
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg"
            >
              Discard
            </button>
            <button
              onClick={handleAdd}
              className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
