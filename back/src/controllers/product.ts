import { Request, Response } from 'express';
import Product from '../models/product';
import Category from '../models/category';


export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        let category = req.params.category;
        let categoryMD = await Category.findOne({ name: category });
        let category_id;
        let products;
        if (categoryMD) {
            category_id = categoryMD.id;
        } else {
            products = await Product.find({ })
            res.status(200).json({ products: products })
            return;
        }
        console.log(category_id);
        products = await Product.find({ category_id: category_id })
        console.log(products)
        res.status(200).json({ products: products })
    } catch (error) {
        console.log(`Error ${error}`)
        res.status(500).json({ message: "Error getting list of products by category" })
    }
}