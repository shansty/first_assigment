import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

export interface IOrder {
    _id?: Types.ObjectId;
    cart_items: Types.ObjectId[];
    status: "Processing" | "Shipped" | "Completed" | "Cancelled";
    total_amount: number; 
    total_price: number; 
}

const orderSchema = new Schema<IOrder>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        cart_items: [{ type: Schema.Types.ObjectId, ref: "CartItem", required: true }], 
        status: {
            type: String,
            enum: ["Processing", "Shipped", "Completed", "Cancelled"], 
            default: "Processing", 
        },
        total_amount: { type: Number, required: true, min: 1 },
        total_price: { type: Number, required: true, min: 0 }, 
    },
    {
        collection: "orders",
    }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
