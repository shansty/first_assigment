import axios from "axios";
import { TypeProduct } from "./types";
import { formatQuery } from "./utils";
import { CATEGORY_URL, PRODUCT_URL, PRODUCT_SEARCH_URL } from "./configs/axios_urls";

export const getCategoriesNames = async (): Promise<string[]> => {
    try {
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
        console.dir({category})
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

export const getSearchedProductNames = async (query: string, setResults: React.Dispatch<React.SetStateAction<TypeProduct[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!query) {
        setResults([]);
        setLoading(false);
        return;
    }
    setLoading(true);
    try {
        const format_query = formatQuery(query);
        const response = await axios.get(`${PRODUCT_SEARCH_URL}${format_query}`);
        const axios_result: TypeProduct[] = response.data.products;
        setResults(axios_result.length ? axios_result : [{ title: "Not found" }]);
    } catch (error) {
        console.error('Error fetching data:', error);
        setResults([{ title: "Not found" }]);
    } finally {
        setLoading(false);
    }
};
