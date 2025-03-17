import { Router } from "express";
import { getProductsByCategory } from "../controllers/product";

const productRoutes:Router = Router();

productRoutes.get('/:category',  getProductsByCategory)

export default productRoutes;