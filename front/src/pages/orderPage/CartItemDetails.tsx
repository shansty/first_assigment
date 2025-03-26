import React from 'react';
import { TypeCartItem } from '../../types';

interface ItemDetailsrops {
    cartItems: TypeCartItem[],
    totalPrice: number | undefined
}



const ItemDetails: React.FC<ItemDetailsrops> = ({ cartItems, totalPrice }) => {
    return (
        <div>
            {cartItems.map((cartItem, index) => (
                <p className='item_data' key={index}>{cartItem.name} - {cartItem.quantity} - $ {cartItem.price}</p>
            ))}
            <p className='total_price'>Total price: $ {totalPrice}</p>
        </div>
    );
}

export default ItemDetails;
