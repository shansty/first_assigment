import Product from './Product';
import { useState, useEffect, use } from 'react';
import { TypeProduct } from '../../../types';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../../axios';
    
interface CategoryProps {
    category: string | undefined;
}

const MainContent: React.FC<CategoryProps> = ({category}) => {
    const [products, setProducts] = useState<TypeProduct[]>([]);

    useEffect(() => {
        getProductsByCategory(category, setProducts);
    }, [category])

    return (
        <div className='main_products_container'>
            {products.map((product, index) => (
                <div key={index}>
                    <Product product={product}/>
                </div>
            )
            )}
        </div>
    );
}


export default MainContent;
