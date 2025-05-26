import { ChevronRight } from "lucide-react";
import { useCategory } from "../context/CategoryContext";
import { useProduct } from "../context/ProductContext";

export default function BreadcrumbActions() {

  const {setshowAddCategory, setshowAddSubCategory} = useCategory()
  const {setShowAddProduct} = useProduct()
  
  
  return (
   <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 gap-4">
  <div className="flex items-center text-sm text-gray-500">
    Home <ChevronRight className="w-4 h-4 mx-1" />
  </div>
  <div className="flex gap-2 flex-wrap justify-center">
    <button onClick={() => setshowAddCategory(true)} className="bg-yellow-500 text-white font-bold px-4 py-2 max-sm:text-sm rounded-full">
      Add category
    </button>
    <button onClick={() => setshowAddSubCategory(true)} className="bg-yellow-500 text-white font-bold px-4 py-2 max-sm:text-sm rounded-full">
      Add sub category
    </button>
    <button onClick={() => setShowAddProduct(true)} className="bg-yellow-500 text-white font-bold px-4 py-2 max-sm:text-sm rounded-full">
      Add product
    </button>
  </div>
</div>
  );
}
