import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  // State để theo dõi tab nào được chọn
  const [selectedTab, setSelectedTab] = useState("Add Product");
  // State để chuyển đổi màu sidebar giữa đen và trắng
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleTabClick = (tab) => {
    // setSelectedTab(tab);
  };

  const toggleSidebarColor = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-100" : "bg-white"}`}>
      {/* Sidebar */}
      <div
        className={`flex flex-col w-64 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } p-4`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-12">
          <span className="text-xl font-semibold">Logo</span>
        </div>

        {/* Nút chuyển đổi màu sidebar */}
          <FontAwesomeIcon  onClick={toggleSidebarColor} icon={faPalette} /> 

        {/* Menu Items */}
        <nav className="mt-10">
          <a
            href="/add"
            onClick={() => handleTabClick("Add Product")}
            className={`flex items-center px-4 py-2 mt-5 ${
              selectedTab === "Add Product"
                ? isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-black"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <span className="mx-4">Add Product</span>
          </a>
          <a
            href="/list"
            onClick={() => handleTabClick("List Product")}
            className={`flex items-center px-4 py-2 mt-5 ${
              selectedTab === "List Product"
                ? isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-black"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <span className="mx-4">List Product</span>
          </a>
          <a
            href="/order"
            onClick={() => handleTabClick("All Orders")}
            className={`flex items-center px-4 py-2 mt-5 ${
              selectedTab === "All Orders"
                ? isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-black"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <span className="mx-4">All Orders</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
