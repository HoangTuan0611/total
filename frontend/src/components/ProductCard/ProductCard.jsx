import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product }) => {
  console.log(product);
  const defaultImage =
    "https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="mx-auto p-4 shadow-lg bg-white rounded-lg">
      {/* Image Section */}
      <div className="relative">
        <img
          src={
            product.image
              ? `http://localhost:4000/images/${product.image}`
              : defaultImage
          }
          alt="Product Preview"
          className="rounded-t-lg"
        />
        <div className="absolute bottom-4 left-4 flex space-x-4 text-white text-sm">
          <div className="bg-black p-2 rounded-full">
            <FontAwesomeIcon icon={faFontAwesome} />
          </div>
          <div className="bg-black p-2 rounded-full">
            <FontAwesomeIcon icon={faFontAwesome} />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">Đã bán: 34,1k</p>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">⭐ 4.9</span>
          <span className="text-gray-400">(50 đánh giá)</span>
        </div>

        {/* Features */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="text-gray-700">Cáp, Cây lấy SIM</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700">12 tháng bảo hành</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 bg-gray-100 rounded-b-lg">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
