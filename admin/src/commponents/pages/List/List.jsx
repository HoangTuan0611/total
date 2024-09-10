import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState(["All"]); // Example categories
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const TABLE_HEAD = ["Name","Image", "Description", "Price", "Category", "", ""];
  const defaultImage =
    "https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


  useEffect(() => {
    getAllCategories()
  }, []);

  useEffect(() => {
    getListProducts();
  }, [selectedCategory, searchTerm]);

  const getAllCategories = async () => {
    const url = `http://localhost:4000/api/food/listcategory`
    const response = await axios.get(url);
    setCategories(["All", ...response.data.data]);
  }

  const getListProducts = async () => {
    try {
      const categoryFilter =
        selectedCategory !== "All" ? `category=${selectedCategory}` : "";
      const searchFilter = searchTerm ? `&search=${searchTerm}` : "";
      const url = `http://localhost:4000/api/food/list?${categoryFilter}${searchFilter}`;
      const response = await axios.get(url);
      setListProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:4000/api/food/remove/${id}`;
      const response = await axios.delete(url);
      setListProduct((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold leading-tight">Product List</h2>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border rounded"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Category filter */}
          <select
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category == 'All' ? 'All' : category == 0 ? 'Phone': 'Laptop'}
              </option>
            ))}
          </select>
        </div>

        {listProduct.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          <div className="overflow-x-auto mt-5">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listProduct.map((product) => (
                    <tr key={product._id} className={product._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <img
                          src={
                            product.image
                              ? `http://localhost:4000/images/${product.image}`
                              : defaultImage
                          }
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.price ? product.price.toFixed(2) : "N/A"} VND
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.category == 0 ? "Phone" : "Laptop"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
