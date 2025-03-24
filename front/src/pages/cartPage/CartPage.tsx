import React from 'react';
import { TypeCartItem } from '../../types';
import { useState, useEffect } from 'react';
import { getCartItems } from '../../axios';
import { getToken, getIDFromToken } from '../../utils';
import CartItem from './CartItem';
import './cartPage.css'

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<TypeCartItem[]>();
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const token = getToken();
    const user_id = token ? getIDFromToken(token) : ""

    useEffect(() => {
        if (token) {
            getCartItemsAndSet();
        }
    }, [])
    
    useEffect(() => {
        if (isChanged) {
            getCartItemsAndSet();
            setIsChanged(false); 
        }
    }, [isChanged]); 
    

    const getCartItemsAndSet = async () => {
        const cart_items = await getCartItems(user_id, token as string);
        if (cart_items) {
            setCartItems(cart_items)
        }
    }
    

    return (
        <div className='cart_page_container'>
            <div className='cart_items'>
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((cartItem, index) => (
                        <CartItem key={index} cartItem={cartItem} token={token} user_id={user_id} setIsChanged={setIsChanged}/>
                    ))
                ) : (
                    <div className='empty_cart_msg'>Cart is empty</div>
                )}
            </div>
        </div>
    );

}

export default CartPage;
