import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    if (token) {
      const fetchOrders = async () => {
        try {
          const response = await axios.post(
            `${url}api/order/userorders`,
            {},
            { headers: { token } }
          );
          if(response.data.success) {
            const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setData(sortedOrders);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [token, url]);

  const handleCancel = () => {
    alert('Cancelled')
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Items</th>
            <th className="px-4 py-2 text-right">Price</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-right">Order Date</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order._id} className="border-b">
              {/* Order Items */}
              <td className="px-4 py-2">
                {order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item._id} className="mb-2">
                      <p className="text-lg font-semibold">
                        {item.name} x {item.quantity}
                      </p>
                      {/* <p className="text-gray-500">
                        Description: {item.description}
                      </p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p> */}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items ordered.</p>
                )}
              </td>

              {/* Order Amount */}
              <td className="px-4 py-2 text-right">
                {order.amount.toLocaleString()} VND
              </td>

              {/* Order Address */}
              <td className="px-4 py-2">
                <p>
                  Name: {`${order.address.firstName} ${order.address.lastName}`}
                </p>
                <p>Email: {order.address.email}</p>
                <p>
                  Address:{" "}
                  {`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zip}, ${order.address.country}`}
                </p>
                <p>{`Phone: ${order.address.phone}`}</p>
              </td>

              {/* Order Status */}
              <td className="px-4 py-2">
                {order.status == 1
                  ? "Food Processing"
                  : order.status == 2
                  ? "Out for delivery"
                  : "Delivered"}
              </td>

              {/* Order Date */}
              <td className="px-4 py-2 text-right">
                {new Date(order.date).toLocaleDateString()}
              </td>

              {/* Track Order Button */}
              <td className="px-4 py-2 text-center">
                {order.status != 3 ? (
                  <div className="relative group inline-block">
                    <button onClick={handleCancel} className="bg-blue-200 hover:bg-blue-300 text-grey-700 font-semibold py-2 px-4 rounded-md">
                      Cancel Order
                    </button>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-2 px-4 z-10 whitespace-nowrap shadow-lg">
                      * Please contact our shop before you cancel the order.
                    </div>
                  </div>
                ) : (
                  <button
                    disabled
                    className="bg-gray-300 font-semibold py-2 px-4 rounded-md"
                  >
                    Cancel Order
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
