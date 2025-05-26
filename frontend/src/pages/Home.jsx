import Header from "../components/Header";
import BreadcrumbActions from "../components/BreadcrumbActions";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import { useCategory } from "../context/CategoryContext";
import { useProduct } from "../context/ProductContext";
import AddSubCategory from "../components/AddSubCategory";

export default function Home() {

  const {setshowAddCategory, showAddCategory, showAddSubCategory, setshowAddSubCategory} = useCategory()
  const {showAddProduct, setShowAddProduct} = useProduct()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BreadcrumbActions />
      <div className="flex flex-col lg:flex-row gap-6 px-6 pb-10">
        <Sidebar />
        <main className="w-full lg:w-4/5">
          <ProductGrid />
          <Pagination />
        </main>

        {showAddProduct && <AddProduct onClose={() => setShowAddProduct(false)} />}

        {showAddCategory && <AddCategory onClose={() => setshowAddCategory(false)} />}

        {showAddSubCategory && <AddSubCategory onClose={() => setshowAddSubCategory(false)} />}
      </div>
    </div>
  );
}
