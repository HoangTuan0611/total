import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: 0,
    subcategory: "",
  });
  const [defaultSubcategory, setDefaultSubcategory] = useState();
  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // State to store selected subcategory
  const [customSubcategory, setCustomSubcategory] = useState(""); // State for custom input

  useEffect(() => {
    getSubcategory();
  }, []);

  const getSubcategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/food/subcategory/0`
      );

      if (response.data.success) {
        console.log(response.data);
        setDefaultSubcategory(response.data.data); // Handle the subcategories data
      } else {
        console.error("Error fetching subcategories");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeCategory = async (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // call api to get subcategory
    const category = e.target.value;
    try {
      const response = await axios.get(
        `http://localhost:4000/api/food/subcategory/${category}`
      );

      if (response.data.success) {
        setDefaultSubcategory(response.data.data); // Handle the subcategories data
      } else {
        console.error("Error fetching subcategories");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const finalSubcategory = customSubcategory || selectedSubcategory;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("subcategory", finalSubcategory);

    const url = `http://localhost:4000/api/food/add`;
    const response = await axios.post(url, formData);

    if (response.data.statusCode === 200) {
      toast.success(response.data.message);

      // Đặt lại giá trị mặc định cho form sau khi thành công
      setData({
        name: "",
        description: "",
        price: "",
        category: 0,
        subcategory: "",
      });
      setCustomSubcategory("")
      setSelectedSubcategory("")
      setDefaultSubcategory("")
      setImage(null); // Đặt lại hình ảnh
    } else {
      toast.error(response.data.message);
    }
  };

  const handleChangeSelect = (e) => {
    setSelectedSubcategory(e.target.value); // Update the selected subcategory
    setCustomSubcategory(""); // Clear custom input if a subcategory is selected
  };

  const handleChangeInput = (e) => {
    setCustomSubcategory(e.target.value); // Update the custom subcategory
    setSelectedSubcategory(""); // Clear selected subcategory if custom input is being entered
  };

  return (
    <form className="flex-col mx-10" onSubmit={onSubmit}>
      <div className="mt-5">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Product name
        </label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="text"
            onChange={(e) => handleChangeData(e)}
            name="name"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Product Photo
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            {/* Display the image preview if an image is selected */}
            {image && (
              <img
                src={URL.createObjectURL(image)} // Create a temporary URL for the image
                alt="Product Preview"
                className="w-32 h-32 object-cover rounded-md mb-4 mx-auto"
              />
            )}
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="image"
                  type="file"
                  className="sr-only"
                  onChange={(e) => setImage(e.target.files[0])} // Update image state
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Product description
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            name="description"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => handleChangeData(e)}
          />
        </div>
      </div>
      <div className="mt-5">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Product price
        </label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="number"
            onChange={(e) => handleChangeData(e)}
            name="price"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-5">
        <label
          htmlFor="country"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Category
        </label>
        <div className="mt-2">
          <select
            onChange={(e) => handleChangeCategory(e)}
            id="category"
            name="category"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value={0}>Phone</option>
            <option value={1}>Laptop</option>
          </select>
        </div>
      </div>
      {/* 1234 */}
      <div className="mt-2">
        <label
          htmlFor="subcategory"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Select or Enter Subcategory
        </label>

        {/* Select Dropdown */}
        <select
          id="subcategory"
          name="subcategory"
          value={selectedSubcategory}
          onChange={handleChangeSelect}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          disabled={customSubcategory.length > 0} // Disable select if custom input is being entered
        >
          {defaultSubcategory?.length > 0 ? (
            defaultSubcategory?.map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No subcategories available
            </option>
          )}
        </select>

        {/* Input for custom subcategory */}
        <div className="mt-3">
          <input
            type="text"
            value={customSubcategory}
            onChange={handleChangeInput}
            placeholder="Or enter a new subcategory"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            disabled={selectedSubcategory.length > 0} // Disable input if subcategory is selected from dropdown
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Add;
