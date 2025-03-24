import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeProduct } from '../../../types';
import { getIDFromToken, getToken } from '../../../utils';
import { addProductToCart } from '../../../axios';

interface ProductProps {
    product: TypeProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {

    const [isRegistered, setIsRegistered] = useState<boolean>();
    const token = getToken();
    const user_id = token ? getIDFromToken(token) : ""

    useEffect(() => {
        if (token) {
            setIsRegistered(true)
        } else {
            setIsRegistered(false)
        }
    }, [])

    const handleAddToCart = async () => {
        await addProductToCart(product, user_id, token as string)
    }

    return (
        <>
            {product ?
                <div className='product_container'>
                    <Link to={`/product_id/${product.id}`}>
                        <img src={product.image} alt={product.title} className='product_img' />
                        <div className='product_data_container'>
                            <h2 className='product_title'>{product.title}</h2>
                            <p className='product_description'>{product.description}</p>
                            <p className='product_price'>Price: ${product.price}</p>
                        </div>
                    </Link>
                    {isRegistered && <button className="add_to_cart_btn" onClick={handleAddToCart}>Add to cart</button>}
                </div>
                :
                <div>
                </div>
            }
        </>
    );
}

export default Product;
