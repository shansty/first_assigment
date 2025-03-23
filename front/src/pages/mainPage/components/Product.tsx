import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeProduct } from '../../../types';
import { getToken } from '../../../utils';

interface ProductProps {
    product: TypeProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {

    const [isRegistered, setIsRegistered] = useState<boolean>();
    const token = getToken();

    useEffect(() => {
        if (token) {
            setIsRegistered(true)
        } else {
            setIsRegistered(false)
        }
    }, [])

    const handleAddToCard = () => {
        //WRITE THE LOGIC
    }

    return (
        <>
            {product ?
                <Link to={`/product_id/${product.id}`} className='product_container'>
                    <img src={product.image} alt={product.title} className='product_img' />
                    <div className='product_data_container'>
                        <h2 className='product_title'>{product.title}</h2>
                        <p className='product_description'>{product.description}</p>
                        <p className='product_price'>Price: ${product.price}</p>
                        {isRegistered && 
                        <button className="add_to_card_btn" onClick={handleAddToCard}>Add to card</button>}
                    </div>
                </Link>
                :
                <div>

                </div>
            }
        </>
    );
}

export default Product;
