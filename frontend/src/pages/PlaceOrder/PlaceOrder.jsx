import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const { listProduct, cartItems, token, getTotalCartAmount } =
    useContext(StoreContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateDeliveryInfo = () => {
    return Object.values(deliveryInfo).every((value) => value.trim() !== "");
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (validateDeliveryInfo()) {
      let orderItem = [];
      listProduct.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItem.push(itemInfo);
        }
      });

      let orderData = {
        address: deliveryInfo,
        items: orderItem,
        amount: getTotalCartAmount() + 2,
      };
      const response = await axios.post(
        `http://localhost:4000/api/order/place`,
        orderData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/myorders");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } else {
      console.log("error");
      toast.error("Pease fullfill the information before order");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Delivery Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Delivery Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="border rounded-md p-3"
                value={deliveryInfo.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="border rounded-md p-3"
                value={deliveryInfo.lastName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="col-span-2 border rounded-md p-3"
                value={deliveryInfo.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                className="col-span-2 border rounded-md p-3"
                value={deliveryInfo.street}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="border rounded-md p-3"
                value={deliveryInfo.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="border rounded-md p-3"
                value={deliveryInfo.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip code"
                className="border rounded-md p-3"
                value={deliveryInfo.zip}
                onChange={handleChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="border rounded-md p-3"
                value={deliveryInfo.country}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="col-span-2 border rounded-md p-3"
                value={deliveryInfo.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
            <div className="border rounded-md p-6 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {getTotalCartAmount()
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(getTotalCartAmount())
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {30000
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(30000)
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {getTotalCartAmount() + 30000
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(getTotalCartAmount() + 30000)
                      : "N/A"}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition"
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
