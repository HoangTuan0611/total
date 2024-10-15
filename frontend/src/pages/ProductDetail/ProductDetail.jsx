import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const { urlProduct } = useContext(StoreContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${urlProduct}detail/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id, urlProduct]);

  console.log(product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={
              product.image != null
                ? `http://localhost:4000/images/${product.image}`
                : "http://localhost:4000/images/default_product.jpg"
            }
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700">{product.description}</p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-red-600">
              {product.price
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)
                : "N/A"}
            </span>
          </div>
          {/* Add To Cart Button */}
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
