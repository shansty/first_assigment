import axios from "axios";
import { TypeProduct } from "./types";
import { formatQuery } from "./utils";
import { CATEGORY_URL, PRODUCT_URL, PRODUCT_ID_URL, PRODUCT_SEARCH_URL } from "./configs/axios_urls";

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
        return [];
    }
}

export const getSearchedProductNames = async (searchQuery: string, setContentData: React.Dispatch<React.SetStateAction<String[]>>) => {
     try {
        const response = await axios.post(`${PRODUCT_SEARCH_URL}${format_query}`, { searchQuery },
            { headers: { 'Content-Type': 'application/json' } });
        const data = await response.data.products;
        console.dir({data})
        if (!data) {
            setContentData([])
        } else {
            setContentData(data);
        }
    } catch (error) {
        console.error(error);
    }
};

export const getProductData = async (product_id: string, setProduct: React.Dispatch<React.SetStateAction<TypeProduct | undefined>>) => {
    const empty_data = { id: 0, image: "", title: "Unknown", price: 0, description: "No description available" };
    const id = +product_id;
    try {
        const response = await axios.get(`${PRODUCT_ID_URL}/${id}`,
            { headers: { 'Content-Type': 'application/json' } });
        const product: TypeProduct = await response.data.product;
        setProduct(product)
    } catch (error) {
        console.error(error);
    }
};