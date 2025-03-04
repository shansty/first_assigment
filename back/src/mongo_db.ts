import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.URI; 

export async function connectDB() {
    try {
        if(!MONGO_URI) {
            console.log(`Bad mongoDB URI`)
        } else {
            await mongoose.connect(MONGO_URI);
            console.log("✅ Connected to MongoDB");
        }
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}
