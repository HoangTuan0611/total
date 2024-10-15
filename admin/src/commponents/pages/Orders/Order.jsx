import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/order/list`,
        {}
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    const response = await axios.post(
      `http://localhost:4000/api/order/update`,
      {"orderId": orderId, "status": status}
    );
    if(response.data.success) {
      toast.success(response.data.message);
      fetchOrders();
    } else {
      toast.error(response.data.message);
    } 
  }

  return (
    <div className="flex h-screen w-full">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Order Page</h2>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4 border-b">Order Date</th>
                <th className="text-left p-4 border-b">Items</th>
                <th className="text-left p-4 border-b">Address</th>
                <th className="text-left p-4 border-b">Items Count</th>
                <th className="text-left p-4 border-b">Total Amount</th>
                <th className="text-left p-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{new Date(order.date).toLocaleDateString("en-US")}</td>
                  <td className="p-4 border-b">
                    {order.items.length > 0
                      ? order.items
                          .map((item) => `${item.name} x ${item.quantity}`)
                          .join(", ")
                      : "No items found"}
                  </td>
                  <td className="p-4 border-b">
                    {order.address.firstName} {order.address.lastName},{" "}
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.zip},{" "}
                    {order.address.country}
                    <br />
                    {order.address.phone}
                  </td>
                  <td className="p-4 border-b">{order.items.length}</td>
                  <td className="p-4 border-b">${order.amount}</td>
                  <td className="p-4 border-b">
                    <select
                      value={order?.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value={1}>Food Processing</option>
                      <option value={2}>Out for delivery</option>
                      <option value={3}>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Order;
