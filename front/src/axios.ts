import axios from "axios";
import { CATEGORY_URL } from "./configs/axios_urls";

export const getCategoriesNames = async (setCategories:React.Dispatch<React.SetStateAction<String[]>>) => {
    try {
        console.log(CATEGORY_URL)
        const response = await axios.get((CATEGORY_URL),
            { headers: { 'Content-Type': 'application/json' } });
        const categories = response.data.categories
        setCategories(categories)
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}