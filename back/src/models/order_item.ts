import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

export interface IOrderItem {
    _id?: Types.ObjectId;
    name: string; 
    quantity: number; 
    price: number; 
    order_id: Types.ObjectId;
}

const orderItemSchema = new Schema<IOrderItem>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 }, 
        price: { type: Number, required: true }
    },
    {
        collection: "order_items"
    }
);

const OrderItem = model<IOrderItem>("OrderItem", orderItemSchema);

export default OrderItem;
