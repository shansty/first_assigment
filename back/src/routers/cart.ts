import { Router } from "express";
import { addToCart, getCartItems, removeFromCart, updateCartItemQuantity } from "../controllers/cart";
import authMiddleware from "../middlewares/auth";

const cartRoutes: Router = Router();

cartRoutes.post("/", authMiddleware, addToCart); 
cartRoutes.get("/:user_id", authMiddleware, getCartItems); 
cartRoutes.patch("/:user_id", authMiddleware, updateCartItemQuantity); 

export default cartRoutes;
