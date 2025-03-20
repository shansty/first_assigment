import { Router } from "express";
import { register, login } from "../controllers/user";

const userRoutes:Router = Router();

userRoutes.post('/register',  register)
userRoutes.post('/login',  login)

export default userRoutes;