import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductData } from '../../axios';
import { TypeProduct } from '../../types';


const ProductPage = () => {

    const { product_id } = useParams()
    const [product, setProduct] = useState<TypeProduct>();

    useEffect(() => {
        getProduct();
    }, [product_id])

    const getProduct = async () => {
        await getProductData(product_id as string, setProduct);
    };

    return (
        <div>
            <p>{product?.title}</p>
        </div>
    );
}

export default ProductPage;
