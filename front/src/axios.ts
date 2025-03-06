import axios from "axios";
import { TypeProduct } from "./types";
import { CATEGORY_URL, PRODUCT_URL } from "./configs/axios_urls";

export const getCategoriesNames = async (): Promise<string[]> => {
    try {
        console.log(CATEGORY_URL)
        const response = await axios.get((CATEGORY_URL),
            { headers: { 'Content-Type': 'application/json' } });
        const categories: string[] = response.data.categories;

        return categories;
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
        return [];
    }
}


export const getProductsByCategory = async (category: string | undefined, setProducts: React.Dispatch<React.SetStateAction<TypeProduct[]>>) => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/${category}`,
            { headers: { 'Content-Type': 'application/json' } });

        const products = response.data.products;
        setProducts(products);
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}

export const getSearchedProductNames = async (searchQuery: string, setContentData: React.Dispatch<React.SetStateAction<String[]>>) => {
    try {
        const response = await axios.post('http://localhost:3000/search', { searchQuery },
            { headers: { 'Content-Type': 'application/json' } });
        const data = await response.data.products;
        console.dir({ data })
        if (!data) {
            setContentData([])
        } else {
            setContentData(data);
        }
    } catch (error) {
        console.error(error);
    }
};