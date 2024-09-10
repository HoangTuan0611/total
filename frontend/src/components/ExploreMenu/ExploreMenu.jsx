import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExploreMenu.css";
const ExploreMenu = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const url = `http://localhost:4000/api/food/listcategory`;
    const response = await axios.get(url);
    setCategory(response.data.data);
  };

  const showSubCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/food/subcategory/0`
      );

      if (response.data.success) {
        console.log(response.data.data); // Handle the subcategories data
      } else {
        console.error("Error fetching subcategories");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const categories = [
    {
      name: "iPhone",
      image: "http://localhost:4000/images/1725682582197iphone-15-pro.jpg",
    },
    {
      name: "Samsung",
      image:
        "http://localhost:4000/images/1725682612010samsung-galaxy-z-fold6-acv-13.jpg",
    },
    {
      name: "Oppo",
      image:
        "http://localhost:4000/images/1725686583104oppo-reno11-f-5g-1-1020x570.jpg",
    },
    {
      name: "Xiaomi",
      image: "http://localhost:4000/images/1725682582197iphone-15-pro.jpg",
    },
    {
      name: "Google",
      image:
        "http://localhost:4000/images/1725682612010samsung-galaxy-z-fold6-acv-13.jpg",
    },
    {
      name: "Nokia",
      image:
        "http://localhost:4000/images/1725686583104oppo-reno11-f-5g-1-1020x570.jpg",
    },
  ];
  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-white">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
            Discover Your Next Smartphone
          </h1>
          <p className="text-gray-600 md:w-3/4">
            Explore our wide range of smartphones with cutting-edge technology,
            stunning designs, and exceptional performance. Whether you are
            looking for the latest flagship model or a budget-friendly device,
            we have something for everyone.
          </p>
          <button className="mt-4 px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700">
            Shop Now
          </button>
        </div>
        {/* Image */}
        <div className="flex-1 mt-8 md:mt-0">
          <img
            src="http://localhost:4000/images/explore_menu.jpg"
            alt="Food Dish"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="p-8 shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Our Shop
        </h2>
        <p className="text-gray-600 mb-8">
          Browse through our various categories to find the perfect smartphone
          that suits your needs.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {category?.map((cat) => (
            <div className="flex flex-col items-center bg-white p-4 rounded-lg">
              <img
                src="http://localhost:4000/images/default_product.jpg"
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                {cat._id == 0 ? "Điện thoại" : "Laptop"}
              </h3>
              <button onClick={() => showSubCategory()}>Show</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreMenu;
