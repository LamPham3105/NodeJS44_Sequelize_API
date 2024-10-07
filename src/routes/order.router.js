import express from "express";
import { addOrder, getOrdersByUser } from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post("/order", addOrder);
orderRoutes.get("/order-user/:userId", getOrdersByUser);

export default orderRoutes;
