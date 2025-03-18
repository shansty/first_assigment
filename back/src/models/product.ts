import mongoose from "mongoose";
const { Schema, model } = mongoose;


export interface IProduct {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    category_id: number;
  }

const productSchema = new Schema<IProduct>({
    id: Number,
    image: String,
    title: String,
    price: Number,
    description: String,
    category_id: Number,
},
    {
        collection: "products"
    });


const Product = model<IProduct>("Product", productSchema);

export default Product;
