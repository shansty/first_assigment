import { Router } from "express";
import { addToCart, getCartItems, removeFromCart } from "../controllers/cart";

const cartRoutes: Router = Router();

cartRoutes.post("/", addToCart); 
cartRoutes.get("/", getCartItems); 
cartRoutes.delete("/:id", removeFromCart); 

export default cartRoutes;
