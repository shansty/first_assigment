import { Router } from "express";
import { getProductsByCategory, getSearchedProductTitles, getProductData } from "../controllers/product";

const productRoutes:Router = Router();

productRoutes.get('/:category',  getProductsByCategory)
productRoutes.get('/',  getSearchedProductTitles)
productRoutes.get('/product_id/:id', getProductData)

export default productRoutes;