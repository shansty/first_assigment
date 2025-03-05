import axios from "axios";
import { TypeProduct } from "./types";
import { CATEGORY_URL, PRODUCT_URL } from "./configs/axios_urls";

export const getCategoriesNames = async () => {
    try {
        console.log(CATEGORY_URL)
        const response = await axios.get((CATEGORY_URL),
            { headers: { 'Content-Type': 'application/json' } });
        return response.data.categories as string[];;
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}

export const getProductsByCategory = async (category: string | undefined, setProducts:React.Dispatch<React.SetStateAction<TypeProduct[]>>) => {
    try {
        const response = await axios.get(`${PRODUCT_URL }/${category}`, 
            { headers: { 'Content-Type': 'application/json' } });

        const products = response.data.products
        setProducts(products)

    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}