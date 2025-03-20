import { Router } from "express";
import { register, login, getUserData, editUserData } from "../controllers/user";

const userRoutes:Router = Router();

userRoutes.post('/register',  register)
userRoutes.post('/login',  login)
userRoutes.get('/:user_id',  getUserData)
userRoutes.patch('/:user_id',  editUserData)

export default userRoutes;