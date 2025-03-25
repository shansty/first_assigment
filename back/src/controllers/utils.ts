import Product from '../models/product';
import Category from '../models/category';
import User from '../models/user';
import * as jwt from 'jsonwebtoken'
import { IUser } from '../models/user';
import { Types } from "mongoose";
import { IOrderItem } from '../models/order';
import Order from '../models/order';


export const getProductsByQuery = async (query: Object) => {
    const products = await Product.find(query)
    return products;
}

export const getProductByQuery = async (query: Object) => {
    const products = await Product.findOne(query)
    return products;
}

export const getCategoriesByQuery = async (query: Object) => {
    const categories = await Category.find(query)
    return categories;
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

export const createOrderEntity = async (user_id: string, quantity: number, sum: number, deliveryMethod: string, paymentMethod: string, cartItems:IOrderItem[], address?: string) => {
    const new_order = await Order.create({
        user_id,
        status: "Processing",
        total_amount: quantity,
        total_price: sum,
        order_items: cartItems,
        delivery: {
            method: deliveryMethod,
            address: address,
        },
        payment_method: paymentMethod,
    });
    return new_order;
}

export const getOrdersByQuery = async (query: Object) => {
    const orders = await Order.find(query)
    return orders;
}

export const getOrderByQuery = async (query: Object) => {
    const order = await Order.findOne(query)
    return order;
}

export const generateToken = (id: Types.ObjectId) => {
    const secret = process.env.SECRET_KEY as string;
    return jwt.sign({ id }, secret, { expiresIn: '60h' });
}


