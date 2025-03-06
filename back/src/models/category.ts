import mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface ICategory {
    id: number;
    name: string;
  }


const categorySchema = new Schema<ICategory>({
    id: Number,
    name: String,
},
    { collection: "categories" });


const Category = model<ICategory>("Category", categorySchema);

export default Category;


