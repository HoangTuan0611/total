import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: false },
  category: { type: String, require: true },
  subcategory: { type: String, required: true },
  amount: { type: Number, require: true},
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
