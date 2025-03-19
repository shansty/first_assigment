import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TypeProduct } from '../types';

interface AppContextType {
    category: string | undefined;
    setCategory: (category: string | undefined) => void;
    searchResults: TypeProduct[];
    setSearchResults: (results: TypeProduct[]) => void;
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

    return (
        <AppContext.Provider value={{ category, setCategory, searchResults, setSearchResults }}>
            {children}
        </AppContext.Provider>
    );
};
