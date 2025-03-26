import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken, getIDFromToken, getTotalPrice } from '../../utils';
import CartItem from './CartItem';
import { useAppContext } from '../../context/AppContext';
import './cartPage.css'

const CartPage: React.FC = () => {
    const [totalPrice, setTotalPrice] = useState<number>();
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const { cartItems, setCartItems } = useAppContext();
    const token = getToken();
    const user_id = token ? getIDFromToken(token) : ""


    useEffect(() => {
        if (isChanged) {
            setIsChanged(false);
            setTotalPrice(getTotalPrice(cartItems))
        }
    }, [isChanged]);

    useEffect(() => {
        setTotalPrice(getTotalPrice(cartItems))
    }, [cartItems])



    return (
        <div className='cart_page_container'>
            <div className='cart_items'>
                {cartItems && cartItems.length > 0 ? (
                    <>
                        {cartItems.map((cartItem, index) => (
                            <CartItem key={index} cartItem={cartItem} token={token} user_id={user_id} setIsChanged={setIsChanged} />
                        ))}
                        <p className='cart_item_total_price'>Total price: ${totalPrice}</p>
                        <button className='confirm_order_btn'>
                            <Link to='/confirm_order' className='confirm_link'>Confirm the order</Link>
                        </button>
                    </>
                ) : (
                    <div className='empty_cart_msg'>Cart is empty</div>
                )}
            </div>
        </div>
    );


}

export default CartPage;
