import { Router } from "express";
import categoryRoutes from "./category";


const rootRouter: Router = Router();

rootRouter.use('/', categoryRoutes);

export default rootRouter;