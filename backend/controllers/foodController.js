import { log } from "console";
import productModel from "../models/food-Model.js";
import fs from "fs";

// add product item

const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  let image_filename = req.file ? req.file.filename : null; // Nếu không có file thì gán giá trị null

  const product = new productModel({
    name: name,
    description: description,
    price: price,
    category: category,
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
    const products = await productModel.find({});
    res.json({ success: true, data: products });
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

export { addProduct, listProduct, removeProduct };
