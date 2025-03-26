import { Router } from "express";
import categoryRoutes from "./category";
import productRoutes from "./product";
import userRoutes from "./user";
import orderRoutes from "./order";


const rootRouter: Router = Router();

rootRouter.use('/category', categoryRoutes);
rootRouter.use('/product', productRoutes);
rootRouter.use('/user', userRoutes);
rootRouter.use('/order', orderRoutes)

export default rootRouter;