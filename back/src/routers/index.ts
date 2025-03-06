import { Router } from "express";
import categoryRoutes from "./category";
import productRoutes from "./product";
import searchRoutes from "./search";


const rootRouter: Router = Router();

rootRouter.use('/category', categoryRoutes);
rootRouter.use('/product', productRoutes);
rootRouter.use('/search', searchRoutes);

export default rootRouter;