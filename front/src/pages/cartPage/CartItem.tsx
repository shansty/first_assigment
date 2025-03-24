import React from 'react';
import { TypeCartItem } from '../../types';
import { updateCartItemQuantity } from '../../axios';


interface CartItemProps {
    cartItem: TypeCartItem,
    token: string | null,
    user_id: string,
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>>
}


const CartItem: React.FC<CartItemProps> = ({ cartItem, token, user_id, setIsChanged }) => {

    const increase_operation = "increase";
    const decrease_operation = "decrease";

    const increaseQuantity = async () => {
        await updateCartItemQuantity(user_id, increase_operation, cartItem._id as string, token as string)
        setIsChanged(true)
    }

    const decreaseQuantity = async () => {
        await updateCartItemQuantity(user_id, decrease_operation, cartItem._id as string, token as string)
        setIsChanged(true)
    }

    return (
        <div>
            <div className='cart_item_container'>
                <h2 className='cart_item_name'>Name: {cartItem.name}</h2>
                <p className='cart_item_price'>Price: $ {cartItem.price}</p>
                <p className='cart_item_quantity'>Quantity: {cartItem.quantity}</p>
                <button onClick={increaseQuantity}> + </button>
                <button onClick={decreaseQuantity}> - </button>
            </div>
        </div>
    );
}

export default CartItem;
