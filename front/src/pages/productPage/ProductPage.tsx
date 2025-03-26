import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductData } from '../../axios';
import { TypeProduct } from '../../types';
import { Helmet } from 'react-helmet-async';
import BasePageLayout from '../../layouts/BasePageLayout';
import { getToken, getIDFromToken, addCartItem } from '../../utils';
import { useAppContext } from '../../context/AppContext';
import './productPage.css'


const ProductPage: React.FC = () => {

    const { product_id } = useParams()
    const [product, setProduct] = useState<TypeProduct>({});
    const [isRegistered, setIsRegistered] = useState<boolean>();
    const { cartItems, setCartItems } = useAppContext();
    const token = getToken();
    const user_id = token ? getIDFromToken(token) : "";

    useEffect(() => {
        if (token) {
            setIsRegistered(true)
        } else {
            setIsRegistered(false)
        }
    }, [])

    useEffect(() => {
        getProductData(product_id as string, setProduct);
    }, [product_id])

    const handleAddToCart = async () => {
        addCartItem(product, cartItems, setCartItems)
    }

    return (
        <>
            <Helmet>
                <title>{`${product.title}` || 'Product Page'}</title>
                <meta name="description" content={product.description || 'View product details'} />
            </Helmet>
            <BasePageLayout>
                <div className='product_page_container'>
                    <div className="product_content">
                        <img src={product.image} className='card_product_image' />
                        <p className='card_product_title'>{product.title}</p>
                        <p className='card_product_description'>{product.description}</p>
                        <p className='card_product_price'>{product.price}</p>
                        {isRegistered &&
                            <button className="add_to_cart_btn" onClick={handleAddToCart}>Add to cart</button>}
                    </div>
                </div >
            </BasePageLayout>
        </>
    );
}
export default ProductPage;
