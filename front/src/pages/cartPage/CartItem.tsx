import React from 'react';
import { TypeCartItem } from '../../types';
import { increaseCartItem, decreaseCartItem } from '../../utils';
import { useAppContext } from '../../context/AppContext';


interface CartItemProps {
    cartItem: TypeCartItem,
    token: string | null,
    user_id: string,
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>>
}


const CartItem: React.FC<CartItemProps> = ({ cartItem, token, user_id, setIsChanged }) => {

    const { cartItems, setCartItems } = useAppContext();

    const increaseQuantity = async () => {
        increaseCartItem(cartItem, cartItems, setCartItems)
        setIsChanged(true)
    }

    const decreaseQuantity = async () => {
        decreaseCartItem(cartItem, cartItems, setCartItems)
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
