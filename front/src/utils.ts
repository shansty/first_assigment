export const formatQuery = (query: string): string => {
    return query
        .trim()                        
        .replace(/\s+/g, ' ')                           
        .toLowerCase()
        .replace(/^./, (char) => char.toUpperCase());                                        
};
