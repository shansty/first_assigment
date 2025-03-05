import { Router } from "express";
import { getCaterories } from "../controllers/category";

const categoryRoutes:Router = Router();

categoryRoutes.get('/',  getCaterories)

export default categoryRoutes;