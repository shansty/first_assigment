import { Router } from "express";
import categoryRoutes from "./category";
import productRoutes from "./product";


const rootRouter: Router = Router();

rootRouter.use('/category', categoryRoutes);
rootRouter.use('/product', productRoutes);

export default rootRouter;