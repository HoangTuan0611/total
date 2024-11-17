import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductItem from "../../components/ProductItem/ProductItem";

const Dtdd = () => {
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState(["All"]); // Example categories
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getListProducts();
  }, [selectedCategory, searchTerm]);

  const getAllCategories = async () => {
    const url = `http://localhost:4000/api/product/listcategory`;
    const response = await axios.get(url);
    setCategories(["All", ...response.data.data]);
  };

  const getListProducts = async () => {
    try {
      const categoryFilter =
        selectedCategory !== "All" ? `category=${selectedCategory}` : "";
      const searchFilter = searchTerm ? `&search=${searchTerm}` : "";
      const url = `http://localhost:4000/api/product/list?${categoryFilter}${searchFilter}`;
      const response = await axios.get(url);
      setListProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <div
        className="mt-10 relative w-full h-48 bg-cover bg-center text-white flex items-center"
        style={{
          backgroundImage:
            "url('http://localhost:4000/images/explore_menu.jpg')",
        }}
      >
        <div className="ml-20 bg-black/10 px-4 py-2 rounded-lg">
          <h1 className="text-xl font-bold">All Phones</h1>
        </div>
      </div>
      <div className="mt-10 flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Category filter */}
        <select
          className="lg:w-1/3 p-2 ml-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category == "All" ? "All" : category == 0 ? "Phone" : "Laptop"}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
        {listProduct.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dtdd;
