import { Request, Response } from 'express';
import { generateToken, getUserByQuery, updateUser, createUser } from './utils';


export const register = async (req: Request, res: Response) => {
    const user = req.body.user;
    if (user.password == "") {
        res.status(400).json({ message: 'Password field is empty' })
        return;
    }
    if (user.email == "") {
        res.status(400).json({ message: 'Email field is empty' })
        return;
    }
    if (user.first_name == "") {
        res.status(400).json({ message: 'First name field is empty' })
        return;
    }
    const already_registered_user = await getUserByQuery({ email: user.email });
    if (already_registered_user) {
        res.status(400).json({ message: "This email has already taken" })
    }
    const createdUser = await createUser(user);
    const token = generateToken(createdUser._id)
    res.status(200).json({ token: token })
}


export const login = async (req: Request, res: Response) => {
    const user = req.body.user;
    if (user.password == "") {
        res.status(400).json({ message: 'Password field is empty' })
        return;
    }
    if (user.email == "") {
        res.status(400).json({ message: 'Email field is empty' })
        return;
    }
    const loginUser = await getUserByQuery({ email: user.email, password: user.password });
    if (!loginUser) {
        res.status(400).json({ message: "Unable to find user with this credentials" });
        return;
    }
    const token = generateToken(loginUser._id)
    res.status(200).json({ token: token })
}


export const getUserData = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const user = await getUserByQuery({ _id: user_id });
    if (!user) {
        res.status(400).json({ message: "Unable to find user with this credentials" });
        return;
    }
    res.status(200).json({ user: user })
}


export const editUserData = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const user_data = req.body.user;
    const edited_user = await updateUser(user_id, user_data);
    if (!edited_user) {
        return res.status(400).json({ message: "Unable to find user with this credentials" });
    }
    res.status(200).json({ edited_user: edited_user })
}


