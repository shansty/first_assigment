import { Request, Response } from 'express';
import Product from '../models/product';
import { IProduct } from '../models/product';


export const getSearchedProductTitles = async (req: Request, res: Response) => {
    try {
        const title: string = req.body.searchQuery;
        let products: String[];
        console.dir({title})
        if(title) {
            products = await getProductTitles(title);
            console.dir({products})
            res.status(200).json({ products: products });
            return;
        } else {
            products = [];
            console.dir({products})
            res.status(200).json({ products: products })
        }
    } catch (error) {
        console.log(`Error ${error}`)
        res.status(500).json({ message: "Error getting list of products by category" })
    }
}


const getProductTitles = async(title: string) : Promise<String[]>  => {
    const products = await Product.find({ title: title })
    const result = products.map(product => product.title)
    return result;
}