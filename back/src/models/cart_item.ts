import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

export interface ICartItem {
    _id?: Types.ObjectId;
    product_id: Types.ObjectId; 
    name: string; 
    quantity: number; 
    price: number; 
}

const cartItemSchema = new Schema<ICartItem>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true }, 
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 }, 
        price: { type: Number, required: true }
    },
    {
        collection: "cart_items"
    }
);

const CartItem = model<ICartItem>("CartItem", cartItemSchema);

export default CartItem;
