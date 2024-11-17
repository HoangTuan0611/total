import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/listUsers`,
        {}
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("remove user", id);
  };

  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Order Page</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4 border-b">Name</th>
                <th className="text-left p-4 border-b">Email</th>
                <th className="text-left p-4 border-b">IsAdmin</th>
                <th className="text-left p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{user.name}</td>
                  <td className="p-4 border-b">{user.email}</td>
                  <td className="p-4 border-b"></td>
                  <td className="p-4 border-b">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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

export default User;
