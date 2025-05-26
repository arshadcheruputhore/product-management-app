import { useState } from "react";
import { useCategory } from "../context/CategoryContext";

export default function AddCategory({ onClose }) {
  const [category, setCategory] = useState("");

  const { addCategory } = useCategory();

  const handleAdd = async () => {
    const result = await addCategory(category);
    if (result.success) {
      alert(result.message);
      setCategory("");
      onClose(); // ✅ Close modal on success
    } else {
      alert(result.message); // ❌ Show error
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm mx-4 rounded-xl shadow-lg p-6">
        <h2 className="text-center text-xl font-semibold mb-6">Add Category</h2>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          className="w-full border rounded px-4 py-2 mb-6"
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={handleAdd}
            className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded"
          >
            ADD
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded"
          >
            DISCARD
          </button>
        </div>
      </div>
    </div>
  );
}
