import { Request, Response } from 'express';
import { getCategoriesByQuery } from './utils';


export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getCategoriesByQuery({});
        const category_names = categories.map((category) => category.name)
        res.status(200).json({ categories: category_names })
    } catch (error) {
        console.log(`Error ${error}`)
        res.status(500).json({ message: "Error getting categories" })
    }
}