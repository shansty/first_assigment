import mongoose, {Types} from "mongoose";
const { Schema, model } = mongoose;


export interface IUser {
    _id?: Types.ObjectId;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    address?: string;
  }

const userSchema = new Schema<IUser>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    address: String,
},
    {
        collection: "users"
    });


const User = model<IUser>("User", userSchema);

export default User;
