import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // Xử lý tăng số lượng
  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);

  // Xử lý giảm số lượng
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Xử lý thêm vào giỏ hàng
  const addToCart = () => {
    // Đây là nơi bạn sẽ xử lý việc thêm sản phẩm vào giỏ hàng.
    // Bạn có thể gọi một hàm từ context hoặc redux để quản lý giỏ hàng.
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="group p-4 border rounded-lg shadow-md bg-white">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={
            product.image != null
              ? `http://localhost:4000/images/${product.image}`
              : "http://localhost:4000/images/default_product.jpg"
          }
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>

      {/* Quantity Controls */}
      <div className="flex items-center mt-4">
        <button
          onClick={decreaseQuantity}
          className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="w-12 text-center border-t border-b border-gray-300 bg-gray-100"
        />
        <button
          onClick={increaseQuantity}
          className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
