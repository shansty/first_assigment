import { Router } from "express";
import { getCategories } from "../controllers/category";

const categoryRoutes:Router = Router();

categoryRoutes.get('/',  getCategories)

export default categoryRoutes;