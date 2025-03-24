import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { TypeCartItem } from "./types";

interface ICustomJwtPayload {
    id: string;
    exp: number;
    iat: number;
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

export const getTotalPrice = (cartItems:TypeCartItem[]): number => {
    if (!cartItems || cartItems.length === 0) return 0;
    let total_price: number = 0;
    cartItems.forEach(item => {
        total_price += item.price ?? 0;
    });
    return parseFloat(total_price.toFixed(2));
};
