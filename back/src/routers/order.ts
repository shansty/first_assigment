import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { createOrder, getUserOrders, getOrder } from "../controllers/order";

const orderRoutes: Router = Router();

orderRoutes.post("/", authMiddleware, createOrder); 
orderRoutes.get("/", authMiddleware, getUserOrders); 
orderRoutes.get("/:order_id", authMiddleware, getOrder); 

export default orderRoutes;
