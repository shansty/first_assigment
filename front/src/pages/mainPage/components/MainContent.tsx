import Product from './Product';
import { useState, useEffect, use } from 'react';
import { TypeProduct } from '../../../types';
import { getProductsByCategory } from '../../../axios';

interface MainContentProps {
    category: string | undefined;
    searchResults: TypeProduct[];
}

const MainContent: React.FC<MainContentProps> = ({ category, searchResults }) => {
    const [products, setProducts] = useState<TypeProduct[]>([]);
    const [showProducts, setShowProducts] = useState(true);
    const not_found_title = "Not found";
    const displayedProducts = searchResults.length > 0 ? searchResults : products;

    useEffect(() => {
        getProductsByCategory(category, setProducts);
        console.dir({products})
    }, [category])

    useEffect(() => {
        if (displayedProducts.length > 0 && displayedProducts[0].title == not_found_title) {
            setShowProducts(false)
        } else {
            setShowProducts(true)
        }
    }, [products, searchResults]);


    return (
        <div className='main_products_container'>
            {displayedProducts.length > 0 && showProducts ? (
                displayedProducts.map((product, index) => (
                    <div key={index}>
                        <Product product={product} />
                    </div>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
}


export default MainContent;
