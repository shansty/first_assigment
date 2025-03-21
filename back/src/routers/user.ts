import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { register, login, getUserData, editUserData } from "../controllers/user";


const userRoutes:Router = Router();

userRoutes.post('/register',  register)
userRoutes.post('/login',  login)
userRoutes.get('/:user_id', [authMiddleware],  getUserData)
userRoutes.patch('/:user_id', [authMiddleware], editUserData)

export default userRoutes;