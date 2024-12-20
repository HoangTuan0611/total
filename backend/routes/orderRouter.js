import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, updateOrderStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/list", listOrders);
orderRouter.post("/update", updateOrderStatus);

export default orderRouter;
