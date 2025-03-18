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

    useEffect(() => {
        getProductsByCategory(category, setProducts);
    }, [category])

    return (
        <div className='main_products_container'>
            {
                searchResults.length > 0 ?
                    searchResults.map((product, index) => (
                        <div key={index}>
                            <Product product={product} />
                        </div>
                    ))
                    :
                    products.map((product, index) => (
                        <div key={index}>
                            <Product product={product} />
                        </div>
                    ))
            }
        </div>
    );
}


export default MainContent;
