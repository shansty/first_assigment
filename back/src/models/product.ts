import mongoose from "mongoose";

const { Schema, model } = mongoose;
const productSchema = new Schema({
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


const Product = model("Product", productSchema);

export default Product;
