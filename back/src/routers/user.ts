import { Router } from "express";
import { getProductsByCategory, getSearchedProductTitles } from "../controllers/product";

const userRoutes:Router = Router();

userRoutes.get('/',  getProductsByCategory)

export default userRoutes;