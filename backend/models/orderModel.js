import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  items: { type: Array, require: true },
  amount: { type: Number, require: true },
  address: { type: addressSchema, required: true },
  status: { type: String, require: true },
  date: { type: String, required: true },
  payment: { type: Number, require: true},
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
