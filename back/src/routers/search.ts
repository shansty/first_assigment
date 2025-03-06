import { Router } from "express";
import { getSearchedProductTitles } from "../controllers/search";

const searchRoutes:Router = Router();

searchRoutes.post('/',  getSearchedProductTitles)

export default searchRoutes;