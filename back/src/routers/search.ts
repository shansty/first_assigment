import { Router } from "express";
import { getSearchedProductTitles } from "../controllers/search";

const searchRoutes:Router = Router();

searchRoutes.get('/:searchQuery',  getSearchedProductTitles)

export default searchRoutes;