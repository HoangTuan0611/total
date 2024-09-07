import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductItem from "../ProductItem/Productitem";

const ProductList = () => {
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    getListProducts();
  }, []);

  const getListProducts = async () => {
    try {
      const url = `http://localhost:4000/api/food/list`;
      const response = await axios.get(url);
      setListProduct((prevProducts) => [
        ...prevProducts,
        ...response.data.data,
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div id="menu" className="bg-white shadow-md">
      <div className="mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-semibold leading-tight">Product List</h2>

        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {listProduct.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
