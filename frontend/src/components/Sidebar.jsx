import { ChevronDown, ChevronRight } from "lucide-react";
import { useCategory } from "../context/CategoryContext";
import { useProduct } from "../context/ProductContext";

export default function Sidebar() {
  const { categories } = useCategory();
  const { setSelectedSubcategories } = useProduct();

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((sub) => sub !== subcategory)
        : [...prev, subcategory]
    );
  };


  return (
    <aside className="w-full lg:w-1/5 mt-3">
      <h2 className="font-semibold text-xl mb-4">Categories</h2>
      <ul className="space-y-2 text-sm">
        <li className="font-medium text-blue-900">All categories</li>

        {categories.map((category, catIndex) => (
          <li key={catIndex}>
            <details className="group">
              <summary className="flex items-center cursor-pointer justify-between font-medium text-gray-800">
                {category.name}
                <ChevronRight className="w-4 h-4 group-open:hidden" />
                <ChevronDown className="w-4 h-4 hidden group-open:inline" />
              </summary>
              <ul className="ml-4 mt-2 space-y-1">
                {category.subcategories.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <input
                      type="checkbox"
                      id={`sub-${catIndex}-${subIndex}`}
                      className="mr-2"
                      onChange={() => handleSubcategoryChange(sub)}
                    />
                    <label htmlFor={`sub-${catIndex}-${subIndex}`}>{sub}</label>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </aside>
  );
}
