import { Request, Response } from "express";
import { createOrderEntity,  getOrdersByQuery, getOrderByQuery} from "./utils";
import { IOrderItem } from "../models/order";


export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user_id, deliveryMethod, paymentMethod, address, cartItems } = req.body as { 
            user_id: string;
            deliveryMethod: string;
            paymentMethod: string;
            address?: string;
            cartItems: IOrderItem[];
        };

        const sum = cartItems.reduce((total, item) => total + item.price, 0);
        const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        

        if (deliveryMethod === "Door to door" && !address) {
            res.status(400).json({ message: "Address is required for door-to-door delivery" });
            return;
        }

        const newOrder = await createOrderEntity(user_id, quantity, sum, deliveryMethod, paymentMethod, cartItems, address);
  
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
        const order = await getOrderByQuery({ _id: order_id, user_id: user_id });
        if (!order) {
            res.status(400).json({ message: "Order not found" });
            return;
        }
        res.status(200).json({ order: order});
    } catch (error: any) {
        res.status(500).json({ message: "Error getting order", error });
    }
};

