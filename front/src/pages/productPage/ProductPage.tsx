import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const ProductPage = () => {

    const { product_id } = useParams();
    console.dir({product_id})

    return (
        <div>
            
        </div>
    );
}

export default ProductPage;
