import Product from '../models/product';
import Category from '../models/category';
import User from '../models/user';
import * as jwt from 'jsonwebtoken'
import { IUser } from '../models/user';
import { Types, Document, ObjectId } from "mongoose";
import CartItem, { ICartItem } from '../models/cart_item';
import { IProduct } from '../models/product';
import Order from '../models/order';
import OrderItem from '../models/order_item';
import { IOrder } from '../models/order';


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

export const getCartItemByQuery = async (query: Object) => {
    const cart_item = await CartItem.findOne(query)
    return cart_item;
}

export const findCartItemByQuery = async (query: Object) => {
    const cart_items = await CartItem.find(query)
    return cart_items;
}

export const createCartItem = async (product: (Document<unknown, {}, IProduct> & IProduct), user_id: ObjectId) => {
    await CartItem.create({
        product_id: product._id,
        user_id: user_id as ObjectId,
        name: product.title,
        quantity: 1,
        price: product.price
    });
}

export const deleteCartItemsByQuery = async (query: Object) => {
    await CartItem.deleteMany(query);
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

export const createOrderEntity = async (user_id: string, quantity: number, sum: number, deliveryMethod: string, paymentMethod: string, address?: string) => {
    const new_order = await Order.create({
        user_id,
        status: "Processing",
        total_amount: quantity,
        total_price: sum,
        delivery: {
            method: deliveryMethod,
            address: address,
        },
        payment_method: paymentMethod,
    });
    return new_order;
}

export const createOrderItem = async (newOrder: Document<unknown, {}, IOrder> & IOrder, cart_item: Document<unknown, {}, ICartItem> & ICartItem ) => {
    const orderItem = await OrderItem.create({
        order_id: newOrder._id,
        name: cart_item.name,
        price: cart_item.price,
        quantity: cart_item.quantity
    });
    return orderItem;
}

export const getOrdersByQuery = async (query: Object) => {
    const orders = await Order.find(query)
    return orders;
}

export const getOrderWithOrderItems = async (query: Object) => {
    const order = await Order.findOne(query).populate("order_items", "name price quantity");
    return order;
}

export const generateToken = (id: Types.ObjectId) => {
    const secret = process.env.SECRET_KEY as string;
    return jwt.sign({ id }, secret, { expiresIn: '60h' });
}

export const increaseCartItemQuantityAndPrice = async (cartItem: (Document<unknown, {}, ICartItem> & ICartItem) , product: (Document<unknown, {}, IProduct> & IProduct)) => {
    cartItem.quantity++;
    cartItem.price = parseFloat((cartItem.price + product.price).toFixed(2));
    await cartItem.save();
}

export const decreaseCartItemQuantityAndPrice = async (cartItem: (Document<unknown> & ICartItem), product: (Document<unknown, {}, IProduct> & IProduct )) => {
    cartItem.quantity--;
    cartItem.price = parseFloat((cartItem.price - product.price).toFixed(2));
    await cartItem.save();
}


