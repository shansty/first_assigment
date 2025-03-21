import Product from '../models/product';
import Category from '../models/category';
import User from '../models/user';
import * as jwt from 'jsonwebtoken'
import { IUser } from '../models/user';
import { Types } from "mongoose";


export const getProductsByQuery = async (query: Object) => {
    const products = await Product.find(query)
    return products;
}

export const getCategoriesByQuery = async (query: Object) => {
    const user = await Category.find(query)
    return user;
}

export const getUserByQuery = async (query: Object) => {
    const user = await User.findOne(query)
    return user;
}

export const updateUser = async (query: Object, body: IUser) => {
    const edited_user = await User.findByIdAndUpdate(
        query,
        { $set: body },
        { new: true, runValidators: true }
    );
    return edited_user;
}

export const createUser = async (user: IUser) => {
    const createdUser = await User.create({
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address
    });
    return createdUser;
}

export const generateToken = (id: Types.ObjectId) => {
    const secret = process.env.SECRET_KEY as string;
    return jwt.sign({ id }, secret, { expiresIn: '60h' });
}
