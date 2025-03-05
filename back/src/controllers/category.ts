import { Request, Response } from 'express';
import Category from '../models/category';


export const getCaterories = async (req: Request, res: Response) => {
    try {
    const categories = await Category.find({});
    const category_names = categories.map((category) => category.name)
    res.status(200).json({categories: category_names})
    } catch(error) {
        console.log(`Error ${error}`)
        res.status(500).json({message: "Error getting categories"})
    }
}


// export async function createUser(name, email, age) {
    //     try {
    //         const user = new User({ name, email, age });
    //         await user.save();
    //         console.log("✅ User Created:", user);
    //     } catch (error) {
    //         console.error("❌ Error Creating User:", error.message);
    //     }
    // }
    
    // export async function getUsers() {
    //     try {
    //         const users = await User.find(); // Fetch all users
    //         console.log("📋 Users List:", users);
    //     } catch (error) {
    //         console.error("❌ Error Fetching Users:", error.message);
    //     }
    // }
    
    // export async function getUserByEmail(email) {
    //     try {
    //         const user = await User.findOne({ email });
    //         console.log("👤 Found User:", user);
    //     } catch (error) {
    //         console.error("❌ Error Finding User:", error.message);
    //     }
    // }
    
    // export async function updateUser(email, newAge) {
    //     try {
    //         const updatedUser = await User.findOneAndUpdate(
    //             { email },
    //             { age: newAge },
    //             { new: true } // Return updated document
    //         );
    //         console.log("✏️ Updated User:", updatedUser);
    //     } catch (error) {
    //         console.error("❌ Error Updating User:", error.message);
    //     }
    // }
    
    
    // export async function deleteUser(email) {
    //     try {
    //         await User.deleteOne({ email });
    //         console.log("🗑️ User Deleted");
    //     } catch (error) {
    //         console.error("❌ Error Deleting User:", error.message);
    //     }
    // }
    