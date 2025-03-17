import { Request, Response } from 'express';
import { getProductsByQuery, getCategoriesByQuery } from './utils';
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

export const getProductData = async (req: Request, res: Response) => {
    try {
        let product_id = +req.params.id;
        console.log(product_id);
        const product = await getProductsByProductId(product_id);
        console.log(product)
        res.status(200).json({product: product})
    } catch (error) {
        console.log(`Error ${error}`)
        res.status(500).json({ message: "Error getting list of products by category" })
    }
}


export const getSearchedProductTitles = async (req: Request, res: Response) => {
    try {
        const title = req.query.search as string;
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
    return getProductsByQuery({ title: title });
}

const getCategoryId = async (category: string): Promise<number | null> => {
    let categoryMD = await getCategoriesByQuery({name: category})
    let category_id: number;
    if (categoryMD[0]) {
        category_id = categoryMD[0].id;
        return category_id;
    } else {
        return null;
    }
};

const getAllProducts = async (): Promise<IProduct[]> => {
    return getProductsByQuery({});
}

const getProductsByCategoryId = async (category_id: number): Promise<IProduct[]> => {
    return getProductsByQuery({category_id: category_id});
}

const getProductsByProductId = async(id: number) : Promise<IProduct[]>  => {
    return getProductsByQuery({id: id});
}