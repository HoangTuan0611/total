import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  items: { type: Array, require: true },
  amount: { type: Number, require: true },
  address: { type: String, require: false },
  status: { type: String, require: true },
  date: { type: String, required: true },
  payment: { type: Number, require: true},
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
