import { Request, Response } from "express";
import CartItem from "../models/cart_item";
import { use } from "react";
import Order from "../models/order";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user_id, deliveryMethod, paymentMethod, address } = req.body;
        const cart_items = await CartItem.find({ user_id: user_id })
        if (!cart_items || cart_items.length === 0) {
            res.status(400).json({ message: "User has empty cart" });
            return;
        }
        
        let sum = 0;
        let quantity = 0;
        cart_items.forEach(item => sum += item.price);
        cart_items.forEach(item => quantity += item.quantity);

        if (deliveryMethod === "Door to door" && !address) {
            return res.status(400).json({ message: "Address is required for door-to-door delivery" });
        }

        const newOrder = await Order.create({
            user_id,
            cart_items: cart_items.map(item => item._id),
            status: "Processing",
            total_amount: quantity,
            total_price: sum,
            delivery: {
                method: deliveryMethod,
                address: address,
            },
            payment_method: paymentMethod,
        })

        await CartItem.deleteMany({ user_id });
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error: any) {
        res.status(500).json({ message: "Error creating order", error });
    }
};


