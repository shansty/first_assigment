import { Request, Response } from "express";
import Order from "../models/order";
import { findCartItemByQuery, createOrderEntity, createOrderItem, deleteCartItemsByQuery, getOrdersByQuery } from "./utils";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user_id, deliveryMethod, paymentMethod, address } = req.body;
        const cart_items = await findCartItemByQuery({ user_id: user_id })
        if (!cart_items || cart_items.length === 0) {
            res.status(400).json({ message: "User has empty cart" });
            return;
        }

        let sum = 0;
        let quantity = 0;
        cart_items.forEach(item => sum += item.price);
        cart_items.forEach(item => quantity += item.quantity);

        if (deliveryMethod === "Door to door" && !address) {
            res.status(400).json({ message: "Address is required for door-to-door delivery" });
            return;
        }

        const newOrder = await createOrderEntity(user_id, quantity, sum, deliveryMethod, paymentMethod, address);
  
        const order_items = await Promise.all(cart_items.map(async item => {
            const orderItem = await createOrderItem(newOrder, item);
            return orderItem._id;
        }));

        newOrder.order_items = order_items;
        await newOrder.save();

        await deleteCartItemsByQuery({ user_id: user_id });
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error: any) {
        res.status(500).json({ message: "Error creating order", error });
    }
};


export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const user_id = req.user._id; 
        const user_orders = await getOrdersByQuery({ user_id: user_id })
        if (!user_orders) {
            res.status(400).json({ message: "User don't have any orders" });
            return;
        }
        res.status(200).json({ user_orders: user_orders});
    } catch (error: any) {
        res.status(500).json({ message: "Error getting user orders", error });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {
        const user_id = req.user._id; 
        const order_id = req.params.order_id
        const order = await Order.findOne({ _id: order_id, user_id: user_id }).populate("order_items", "name price quantity");
        if (!order) {
            res.status(400).json({ message: "Order not found" });
            return;
        }
        res.status(200).json({ order: order});
    } catch (error: any) {
        res.status(500).json({ message: "Error getting order", error });
    }
};

