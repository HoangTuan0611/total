import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(0); // Start with 0 quantity
  const { addToCart, removeFromCart } = useContext(StoreContext);

  // Increase quantity and add to cart
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(product._id); // Add product to cart when clicked
  };

  // Decrease quantity and remove from cart
  const decreaseQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (newQuantity === 0) {
        removeFromCart(product._id); // Remove from cart when quantity reaches 0
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white group">
      {/* Product Image */}
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

        {/* Quantity Controls */}
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          {quantity > 0 ? (
            <>
              <button
                onClick={decreaseQuantity}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                -
              </button>
              <span className="text-center text-white font-medium">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-green-500 text-white rounded-full p-1 hover:bg-green-600"
              >
                +
              </button>
            </>
          ) : (
            <button
              onClick={increaseQuantity}
              className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600"
            >
              +
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {product.description ||
            "Food provides essential nutrients for overall health and well-being"}
        </p>
        <div className="flex items-center justify-between mt-2">
          {/* Rating (dummy rating for now) */}
          <div className="flex items-center">
            <span className="text-yellow-500">★★★★☆</span>
          </div>
          {/* Price */}
          <p className="text-lg font-bold text-red-600">${product.price}</p>
        </div>
      </div>

      {/* Add to Cart Button (hidden for now since it uses + button) */}
      {/* <button
        onClick={() => addToCart(product._id)}
        className="mt-4 w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors"
      >
        Add to Cart
      </button> */}
    </div>
  );
};

export default ProductItem;
