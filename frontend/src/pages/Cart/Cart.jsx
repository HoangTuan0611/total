import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { listProduct, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  console.log("listProduct", listProduct);
  console.log("cartItems", cartItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Cart</h2>

      {/* Table for Cart Items */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-4">
                      <img
                        src={
                          item.image != null
                            ? `http://localhost:4000/images/${item.image}`
                            : "http://localhost:4000/images/default_product.jpg"
                        }
                        alt={item.title}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-4">{item.name}</td>
                    <td className="px-4 py-4">
                      {item.price
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)
                        : "N/A"}
                    </td>
                    <td className="px-4 py-4">{cartItems[item._id]}</td>
                    <td className="px-4 py-4">
                      {item.price * cartItems[item._id]
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price * cartItems[item._id])
                        : "N/A"}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item._id)}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      {/* Cart Totals Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Totals */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Cart Totals</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{getTotalCartAmount()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{1000}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{getTotalCartAmount() + 1000}</span>
            </div>
          </div>
          <Link to="/order">
            <button className="mt-4 px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>

        {/* Promo Code */}
        <div className="mt-4 md:mt-0">
          <h3 className="text-lg font-bold mb-4">
            If you have a promo code, enter it here
          </h3>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Promo code"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button className="px-6 py-2 text-white bg-black rounded hover:bg-gray-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
