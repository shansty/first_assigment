import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

export interface IOrder {
    _id?: Types.ObjectId;
    cart_items: Types.ObjectId[];
    user_id: Types.ObjectId;
    status: "Processing" | "Shipped" | "Completed" | "Cancelled";
    total_amount: number;
    total_price: number;
    delivery: {
        method: string;
        address?: string;
    };
    payment_method: "Card payment" | "Payment in cash to the courier" | "Payment by card to the courier";
}

const orderSchema = new Schema<IOrder>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        cart_items: [{ type: Schema.Types.ObjectId, ref: "CartItem", required: true }],
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Fixed: should not be an array
        status: {
            type: String,
            enum: ["Processing", "Shipped", "Completed", "Cancelled"],
            default: "Processing",
        },
        total_amount: { type: Number, required: true, min: 1 },
        total_price: { type: Number, required: true, min: 0 },
        delivery: {
            method: { type: String, required: true },
            address: {
                type: String,
                required: function (this: IOrder) {
                    return this.delivery.method === "Door to door";
                },
            },
        },
        payment_method: {
            type: String,
            enum: ["Card payment", "Payment in cash to the courier", "Payment by card to the courier"],
            default: "Card payment",
        },
    },
    {
        collection: "orders",
    }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
