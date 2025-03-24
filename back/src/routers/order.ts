import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { createOrder } from "../controllers/order";

const orderRoutes: Router = Router();

orderRoutes.post("/", authMiddleware, createOrder); 

export default orderRoutes;
