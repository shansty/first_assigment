import axios from "axios";
import { TypeProduct, TypeUser } from "./types";
import { formatQuery } from "./utils";
import { CATEGORY_URL, PRODUCT_URL, PRODUCT_SEARCH_URL, PRODUCT_ID_URL, USER_URL, USER_LOGIN_URL } from "./configs/axios_urls";


export const getCategoriesNames = async () => {
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
        const products = await response.data.products;
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

export const getProductData = async (product_id: string, setProduct: React.Dispatch<React.SetStateAction<TypeProduct>>) => {
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

export const signUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: TypeUser) => {
    e.preventDefault();
    try {
        const response = await axios.post(USER_URL, { user },
            { headers: { 'Content-Type': 'application/json' } });
        const token = response?.data?.token;
        localStorage.setItem("token", token);
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}


export const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: TypeUser) => {
    e.preventDefault();
    try {
        const response = await axios.post(USER_LOGIN_URL, { user },
            { headers: { 'Content-Type': 'application/json' } });
        const token = response?.data?.token;
        localStorage.setItem("token", token);
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}

export const getUserData = async (user_id: string) => {
    try {
        const response = await axios.get(`${USER_URL}/${user_id}`,
            { headers: { 'Content-Type': 'application/json' } });
        const user: TypeUser = response.data.user;
        return user;
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}

export const editUserData = async ( user: TypeUser, user_id: string) => {
    try {
        const response = await axios.patch(`${USER_URL}/${user_id}`, { user }, 
            { headers: { 'Content-Type': 'application/json' } });
        const edited_user: TypeUser = response.data.edited_user;
        return edited_user;
    } catch (err: any) {
        if (err.response.data) {
            window.alert(` ${err.response.data.message}`);
        } else {
            window.alert(`Error: ${err}`);
        }
    }
}
