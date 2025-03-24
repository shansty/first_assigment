import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TypeProduct, TypeCartItem } from '../types';

interface AppContextType {
    category: string | undefined;
    setCategory: (category: string | undefined) => void;
    searchResults: TypeProduct[];
    setSearchResults: (results: TypeProduct[]) => void;
    cartItems: TypeCartItem[];
    setCartItems: (results: TypeCartItem[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [category, setCategory] = useState<string | undefined>();
    const [searchResults, setSearchResults] = useState<TypeProduct[]>([]);
    const [cartItems, setCartItems] = useState<TypeCartItem[]>(() => {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <AppContext.Provider value={{ category, setCategory, searchResults, setSearchResults, cartItems, setCartItems }}>
            {children}
        </AppContext.Provider>
    );
};

