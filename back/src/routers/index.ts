import { Router } from "express";
import categoryRoutes from "./category";


const rootRouter: Router = Router();

rootRouter.use('/category', categoryRoutes);

export default rootRouter;