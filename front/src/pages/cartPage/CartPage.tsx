import React, { useReducer } from 'react';
import { TypeCartItem } from '../../types';
import { useState, useEffect } from 'react';
import { getCartItems } from '../../axios';
import { getToken, getIDFromToken } from '../../utils';
import CartItem from './CartItem';
import './cartPage.css'

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<TypeCartItem[]>();
    const [totalPrice, setTotalPrice] = useState<number>();
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
            setTotalPrice(getTotalPrice())
        }
    }, [isChanged]);

    useEffect(() => {
        setTotalPrice(getTotalPrice())
    }, [cartItems])


    const getCartItemsAndSet = async () => {
        const cart_items = await getCartItems(user_id, token as string);
        if (cart_items) {
            setCartItems(cart_items)
        }
    }

    const getTotalPrice = (): number => {
        if (!cartItems || cartItems.length === 0) return 0;
        let total_price: number = 0;
        cartItems.forEach(item => {
            total_price += item.price ?? 0;
        });
        return total_price;
    };


    return (
        <div className='cart_page_container'>
            <div className='cart_items'>
                {cartItems && cartItems.length > 0 ? (
                    <>
                        {cartItems.map((cartItem) => (
                            <CartItem key={cartItem._id} cartItem={cartItem} token={token} user_id={user_id} setIsChanged={setIsChanged} />
                        ))}
                        <p className='cart_item_total_price'>Total price: ${totalPrice}</p>
                        <button className='confirm_order_btn'>Confirm the order</button>
                    </>
                ) : (
                    <div className='empty_cart_msg'>Cart is empty</div>
                )}
            </div>
        </div>
    );


}

export default CartPage;
