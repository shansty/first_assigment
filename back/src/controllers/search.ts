import { Request, Response } from 'express';
import Product from '../models/product';
import { IProduct } from '../models/product';


export const getSearchedProductTitles = async (req: Request, res: Response) => {
    try {
        const title: string = req.params.searchQuery;
        let products: IProduct[];
        if(title) {
            products = await getProductTitles(title);
            res.status(200).json({ products: products });
        } else {
            products = [];
            res.status(200).json({ products: products })
        }
    } catch (error) {
        console.log(`Error ${error}`)
        res.status(500).json({ message: "Error getting list of products by category" })
    }
}


const getProductTitles = async(title: string) : Promise<IProduct[]>   => {
    const products = await Product.find({ title: title })
    return products;
}