import { Request, Response } from 'express';
import Product from '../models/product';
import Category from '../models/category';
import { IProduct } from '../models/product';


export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        let category = req.params.category;
        const category_id = await getCategoryId(category);
        let products;
        if(category_id) {
            products = await getProductsByCategoryId(category_id)
        } else {
            products = await getAllProducts()
        }
        res.status(200).json({ products: products })
    } catch (error) {
        console.log(`Error ${error}`)
        res.status(500).json({ message: "Error getting list of products by category" })
    }
}


const getCategoryId = async (category: string): Promise<number | null> => {
    let categoryMD = await Category.findOne({ name: category });
    let category_id: number;
    if (categoryMD) {
        category_id = categoryMD.id;
        return category_id;
    } else {
        return null;
    }
};

const getAllProducts = async (): Promise<IProduct[]>   => {
    const products = await Product.find({});
    return products;
} 

const getProductsByCategoryId = async(category_id: number) : Promise<IProduct[]>  => {
    const products = await Product.find({ category_id: category_id })
    return products;
}