import { Request, Response } from "express";
import { ObjectId, Types } from "mongoose";
import Product from "../models/product";
import CartItem from "../models/cart_item";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product, user_id } = req.body;
        const product_db = await Product.findOne({ id: product.id });
        if (!product_db) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        let cartItem = await CartItem.findOne({ product_id: product_db._id, user_id: user_id });
        if (cartItem) {
            cartItem.quantity++;
            cartItem.price = cartItem.price + product_db.price;
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
    } catch (error: any) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};


export const getCartItems = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id;
        if (!user_id) {
            res.status(400).json({ message: "User with such credentials not found" });
            return;
        }
        const cart_items = await CartItem.find({ user_id: user_id })
        res.status(200).json({ cart_items: cart_items });
    } catch (error: any) {
        res.status(500).json({ message: "Error getting cart items", error });
    }
};



export const updateCartItemQuantity = async (req: Request, res: Response) => {
    try {
        const increase_operation = "increase";
        const decrease_operation = "decrease";
        const user_id = req.params.user_id;
        const { operation, cart_item_id } = req.body;

        if (!user_id) {
            res.status(400).json({ message: "User with such credentials not found" });
            return;
        }

        const cart_item = await CartItem.findOne({ user_id: user_id, _id: cart_item_id });

        if (!cart_item) {
            res.status(400).json({ message: "User doesn't have such cart item" });
            return;
        }

        const product = await Product.findOne({_id: cart_item.product_id})
        if(!product) {
            res.status(400).json({ message: "Such product doesn't exists" });
            return;
        }

        if (operation === increase_operation) {
            cart_item.quantity++;
            cart_item.price = cart_item.price + product?.price;
            await cart_item.save();
        } else if (operation === decrease_operation && cart_item.quantity > 1) {
            cart_item.quantity--;
            cart_item.price = cart_item.price - product?.price;
            await cart_item.save();
        } else {
            await cart_item.deleteOne();
        }
        res.status(200).json({ message: "Cart updated successfully", cart_item });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
