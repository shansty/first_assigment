import { Router } from "express";
import { getProductsByCategory, getSearchedProductTitles } from "../controllers/product";

const productRoutes:Router = Router();

productRoutes.get('/:category',  getProductsByCategory)
productRoutes.get('/',  getSearchedProductTitles)

export default productRoutes;