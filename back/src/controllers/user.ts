import { Request, Response } from 'express';
import { IUser } from '../models/user';
import User from '../models/user';
import * as jwt from 'jsonwebtoken'
import { Types } from "mongoose";


export const register = async (req: Request, res: Response) => {
    const user = req.body.user;
    if (user.password == "" || user.email == "" || user.first_name == "") {
        res.status(404).json({ message: 'Requred data is empty' })
        return;
    }
    const already_registered_user = await User.findOne({ email: user.email })

    if (already_registered_user) {
        res.status(404).json({ message: "User already registered" })
    }

    const createdUser = await User.create({
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address
    });
}


export const login = async (req: Request, res: Response) => {
    const user = req.body.user;
    if (user.password === "" || user.email === "") {
        res.json({ message: 'Requred data is empty' })
        return;
    }
    const loginUser = await User.findOne({ email: user.email, password: user.password });

    if (!loginUser) {
        res.status(404).json({ message: "User not registered" });
        return;
    }

    const token = generateToken(loginUser._id)
    res.status(200).json({ token: token })
}

export const getUserData = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
        res.status(404).json({ message: "User data not found" });
        return;
    }
    res.status(200).json({ user: user })
}


export const editUserData = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const user_data = req.body.user;
    const edited_user = await User.findByIdAndUpdate(
        user_id,
        { $set: user_data },
        { new: true, runValidators: true }
    );
    if (!edited_user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ edited_user: edited_user })
}


const generateToken = (id: Types.ObjectId) => {
    const secret = process.env.SECRET_KEY as string;
    return jwt.sign({ id }, secret, { expiresIn: '60h' });
}