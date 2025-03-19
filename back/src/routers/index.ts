import { Router } from "express";
import categoryRoutes from "./category";
import productRoutes from "./product";
import userRoutes from "./user";


const rootRouter: Router = Router();

rootRouter.use('/category', categoryRoutes);
rootRouter.use('/product', productRoutes);
rootRouter.use('/profile', userRoutes);

export default rootRouter;