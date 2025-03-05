import mongoose from "mongoose";

const { Schema, model } = mongoose;
const categorySchema = new Schema({
    id: Number,
    name: String,
},
    { collection: "categories" });


const Category = model("Category", categorySchema);

export default Category;
