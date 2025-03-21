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
    if (user.first_name && user.first_name.length > 31) {
        res.status(400).json({ message: 'First name is too long' })
        return;
    }
    if (user.last_name && user.last_name.length > 31) {
        res.status(400).json({ message: 'Last name is too long' })
        return;
    }
    const already_registered_user = await getUserByQuery({ email: user.email });
    if (already_registered_user) {
        res.status(400).json({ message: "This email is already taken" })
        return;
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

    if (!user_data.email || user_data.email == "") {
        res.status(400).json({ message: 'Email field is empty', user: user_data })
        return;
    }
    if (!user_data.first_name || user_data.first_name == "") {
        res.status(400).json({ message: 'First name field is empty', user: user_data })
        return;
    }
    if (user_data.first_name.length > 31) {
        res.status(400).json({ message: 'First name field is too long', user: user_data })
        return;
    }
    if (user_data.last_name && user_data.last_name.length > 31) {
        res.status(400).json({ message: 'First name field is too long', user: user_data })
        return;
    }
    const edited_user = await updateUser(user_id, user_data);
    if (!edited_user) {
        return res.status(400).json({ message: "Unable to find user with this credentials" });
    }
    res.status(200).json({ user: edited_user })
}
