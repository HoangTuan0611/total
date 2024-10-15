import productModel from "../models/productModel.js";
import fs from "fs";

// add product item

const addProduct = async (req, res) => {
  const { name, description, price, category, subcategory } = req.body;
  let image_filename = req.file ? req.file.filename : null; // Nếu không có file thì gán giá trị null

  const product = new productModel({
    name: name,
    description: description,
    price: price,
    category: category,
    subcategory: subcategory,
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, statusCode: 200, message: "Product Added" });
  } catch (error) {
    res.json({
      success: false,
      statusCode: 400,
      message: "Product Add Failed",
    });
  }
};

// all product list
const listProduct = async (req, res) => {
  try {
    const { category, search } = req.query; // Get query parameters for category and search
    console.log(category);
    // Build query object dynamically based on query parameters
    let query = {};

    if (category && category !== "All") {
      query.category = category; // Filter by category if provided
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }; // Search by product name (case-insensitive)
    }

    // Fetch products based on the query object
    const products = await productModel.find(query);

    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listCategory = async (req, res) => {
  try {
    // Use distinct to get unique category values from the products collection
    const categories = await productModel.distinct("category");
    res.json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listCategoryWithSubcategory = async (req, res) => {
  try {
    const categories = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          subcategories: { $addToSet: "$subcategory" }, // Add unique subcategories
        },
      },
    ]);

    res.json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listSubcategoryByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    console.log(category);
    const subcategories = await productModel.aggregate([
      {
        $match: { category: category },
      },
      {
        $group: {
          _id: "$category",
          subcategories: { $addToSet: "$subcategory" },
        },
      },
    ]);

    if (subcategories.length === 0) {
      return res.json({ success: true, data: [] });
    }

    res.json({ success: true, data: subcategories[0].subcategories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove product item
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    // Kiểm tra nếu sản phẩm không tồn tại
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    fs.unlink(`upload/${product.image}`, () => {});

    await productModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error removing product" });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export {
  addProduct,
  listProduct,
  listCategory,
  removeProduct,
  listCategoryWithSubcategory,
  listSubcategoryByCategory,
  getProduct
};
