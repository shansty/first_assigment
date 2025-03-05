import React from 'react';
import { TypeProduct } from '../../../types';

interface ProductProps {
    product: TypeProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className='product_container'>
            <img src={product.image} alt={product.title} className='product_img' />
            <div className='product_data_container'>
                <h2 className='product_title'>{product.title}</h2>
                <p className='product_description'>{product.description}</p>
                <p className='product_price'>Price: ${product.price}</p>
            </div>
        </div>
    );
}

export default Product;
