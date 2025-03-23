import { Request, Response } from "express";
import { ObjectId, Types } from "mongoose";
import Product from "../models/product";
import CartItem from "../models/cart_item";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const {product, user_id} = req.body;
        const product_db = await Product.findOne({id: product.id});
        if (!product_db) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        let cartItem = await CartItem.findOne({ product_id: product_db._id, user_id: user_id });
        if (cartItem) {
            cartItem.quantity++;
            await cartItem.save();
        } else {
            await CartItem.create({
                product_id: product_db._id,
                user_id: user_id as ObjectId,
                name: product_db.title,
                quantity: 1,
                price: product_db.price
            });
        }
        res.status(200).json({ message: "Product added to cart", cartItem });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};


export const getCartItems = async (req: Request, res: Response) => {

};


export const removeFromCart = async (req: Request, res: Response) => {
}
