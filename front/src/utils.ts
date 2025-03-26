import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { TypeCartItem, TypeProduct } from "./types";

interface ICustomJwtPayload {
    id: string;
    exp: number;
    iat: number;
}

export const addCartItem = (product: TypeProduct, cartItems: TypeCartItem[], setCartItems: (results: TypeCartItem[]) => void) => {
    if (!product || product.price === undefined) return;

    const existingItemIndex = cartItems.findIndex(item => item.name === product.title);

    if (existingItemIndex !== -1) {
        const updatedCartItems = cartItems.map((item, index) =>
            index === existingItemIndex
                ? {
                    ...item,
                    quantity: (item.quantity ?? 0) + 1,
                    price: parseFloat(((item.price ?? 0) + (product.price ?? 0)).toFixed(2))
                }
                : item
        );
        setCartItems(updatedCartItems);
    } else {
        const newCartItem: TypeCartItem = {
            name: product.title,
            quantity: 1,
            price: product.price
        };
        setCartItems([...cartItems, newCartItem]);
    }
}

export const increaseCartItem = ( cartItem: TypeCartItem, cartItems: TypeCartItem[], setCartItems: (results: TypeCartItem[]) => void) => {
    const updatedCartItems = cartItems.map(item =>
        item.name === cartItem.name
            ? {
                ...item,
                quantity: (item.quantity ?? 0) + 1,
                price: parseFloat(((item.price ?? 0) + (item.price ?? 0) / (item.quantity ?? 1)).toFixed(2))
            }
            : item
    );
    setCartItems(updatedCartItems);
};

export const decreaseCartItem = (cartItem: TypeCartItem, cartItems: TypeCartItem[], setCartItems: (results: TypeCartItem[]) => void) => {
    const updatedCartItems = cartItems.map(item =>
        item.name === cartItem.name
            ? {
                ...item,
                quantity: (item.quantity ?? 0) - 1,
                price: parseFloat(((item.price ?? 0) - (item.price ?? 0) / (item.quantity ?? 1)).toFixed(2))
            }
            : item
    );
    setCartItems(updatedCartItems);
}


export const formatQuery = (query: string): string => {
    return query
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .replace(/^./, (char) => char.toUpperCase());
};

export function getIDFromToken(token: string): string {
    const decoded: ICustomJwtPayload = jwtDecode(token);
    return decoded.id;
}

export function getToken(): string | null {
    const token = localStorage.getItem("token") as string
    if (!token || token === null || token === "") {
        return null;
    }
    return token;
}

export const getUserIdAndNavigateToMainPage = (navigate: NavigateFunction): string | void => {
    const token = getToken() as string;
    if (!token) {
        return;
    }
    const user_id = getIDFromToken(token);
    navigate(`/`)
}

export const getTotalPrice = (cartItems: TypeCartItem[]): number => {
    if (!cartItems || cartItems.length === 0) return 0;
    let total_price: number = 0;
    cartItems.forEach(item => {
        total_price += item.price ?? 0;
    });
    return parseFloat(total_price.toFixed(2));
};
