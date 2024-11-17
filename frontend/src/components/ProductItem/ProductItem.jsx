import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems && cartItems[product._id] !== undefined) {
      setQuantity(cartItems[product._id]);
    }
  }, [cartItems, product._id]);

  const increaseQuantity = (e) => {
    e.stopPropagation();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(product._id);
  };

  const decreaseQuantity = (e) => {
    e.stopPropagation();
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      removeFromCart(product._id);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="p-4 border rounded-lg shadow-md bg-white group cursor-pointer flex flex-col justify-between"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img
          src={
            product.image != null
              ? `http://localhost:4000/images/${product.image}`
              : "http://localhost:4000/images/default_product.jpg"
          }
          alt={product.name}
          className="h-40 w-full object-cover rounded-lg"
        />
      </div>
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-bold text-red-500">
          {product.price
            ? new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)
            : "N/A"}
        </p>
        <div className="flex items-center space-x-2">
          {quantity > 0 ? (
            <>
              <button
                onClick={decreaseQuantity}
                className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
              >
                -
              </button>
              <span className="text-center text-black font-medium">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
              >
                +
              </button>
            </>
          ) : (
            <button
              onClick={increaseQuantity}
              className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
