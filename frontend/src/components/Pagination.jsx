import { useProduct } from "../context/ProductContext";

export default function Pagination() {

    const {
        currentPage,
        setCurrentPage,
        totalPages,
        products,
        itemsPerPage,
    } = useProduct();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-sm text-gray-600">
      <div>{`${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(
        currentPage * itemsPerPage,
        products.length
      )} of ${products.length} items`}</div>

      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`px-2.5 py-1 font-semibold rounded-full ${currentPage === i + 1 ? "bg-yellow-400 text-white" : "hover:bg-gray-100 text-yellow-500"}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1">
        Show
        <select className="border border-gray-300 rounded px-2 py-1">
          <option>{itemsPerPage} rows</option>
        </select>
      </div>
    </div>
  );
}
