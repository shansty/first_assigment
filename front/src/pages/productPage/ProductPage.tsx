import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductData } from '../../axios';
import { TypeProduct } from '../../types';
import { Helmet } from 'react-helmet-async';
import NavigationMenu from '../../utils_components/NavigationMenu';
import './productPage.css'


const ProductPage = () => {

    const { product_id } = useParams()
    const [product, setProduct] = useState<TypeProduct>({});

    useEffect(() => {
        getProductData(product_id as string, setProduct);
    }, [product_id])



    return (
        <div className='product_page'>
            <Helmet>
                <title>{product.title ? `${product.title}` : 'Product Page'}</title>
                <meta name="description" content={product.description || 'View product details'} />
            </Helmet>
            <div className='nav_menu'>
                <NavigationMenu />
            </div>
            <div className='product_page_container'>
                <div className="product_content">
                    <img src={product.image} className='card_product_image' />
                    <p className='card_product_title'>{product.title}</p>
                    <p className='card_product_description'>{product.description}</p>
                    <p className='card_product_price'>{product.price}</p>
                </div>
            </div >
        </div>
    );
}
export default ProductPage;
