import mongoose from "mongoose";
const { Schema, model } = mongoose;


export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    addres: string;
  }

const userSchema = new Schema<IUser>({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    addres: String,
},
    {
        collection: "users"
    });


const User = model<IUser>("Product", userSchema);

export default User;
