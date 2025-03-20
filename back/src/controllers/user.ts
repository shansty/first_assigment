import { Request, Response } from 'express';
import { generateToken, getUserByQuery, updateUser, createUser } from './utils';


export const register = async (req: Request, res: Response) => {
    const user = req.body.user;
    if (user.password == "" || user.email == "" || user.first_name == "") {
        res.status(404).json({ message: 'Requred data is empty' })
        return;
    }
    const already_registered_user = await getUserByQuery({ email: user.email });
    if (already_registered_user) {
        res.status(404).json({ message: "User already registered" })
    }
    const createdUser = await createUser(user);
    const token = generateToken(createdUser._id)
    res.status(200).json({ token: token })
}


export const login = async (req: Request, res: Response) => {
    const user = req.body.user;
    if (user.password === "" || user.email === "") {
        res.json({ message: 'Requred data is empty' })
        return;
    }
    const loginUser = await getUserByQuery({ email: user.email, password: user.password });
    if (!loginUser) {
        res.status(404).json({ message: "User not registered" });
        return;
    }
    const token = generateToken(loginUser._id)
    res.status(200).json({ token: token })
}


export const getUserData = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const user = await getUserByQuery({ _id: user_id });
    if (!user) {
        res.status(404).json({ message: "User data not found" });
        return;
    }
    res.status(200).json({ user: user })
}


export const editUserData = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const user_data = req.body.user;
    const edited_user = await updateUser(user_id, user_data);
    if (!edited_user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ edited_user: edited_user })
}


