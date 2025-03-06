import Product from '../models/product';
import Category from '../models/category';


export const getProductsByQuery = async (query: Object) => {
    const products = await Product.find(query)
    return products;
}

export const getCategoriesByQuery = async (query: Object) => {
    const categories = await Category.find(query)
    return categories;
}
