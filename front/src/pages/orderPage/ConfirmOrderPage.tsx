import React, { useState } from 'react';
import { getToken, getIDFromToken, getTotalPrice } from '../../utils';
import { createOrder, getUserData } from '../../axios';
import { useAppContext } from '../../context/AppContext';
import FormField from '../../utils_components/FormField';
import { useEffect } from 'react';
import './orderPage.css'

const ConfirmOrderPage = () => {

    const token = getToken();
    const user_id = token ? getIDFromToken(token) : "";
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [deliveryMethod, setDeliveryMethod] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>();


    const { cartItems } = useAppContext();

    useEffect(() => {
        if (token) {
            setTotalPrice(getTotalPrice(cartItems))
            getUserAdressIfExists();
        }
    }, [])

    const getUserAdressIfExists = async() => {
        const user = await getUserData(user_id, token as string);
        if(user) {
            setAddress(user.address as string)
        } 
    }

    const handleSubmit = async () => {
        if (deliveryMethod === "Door to door" && !address) {
            alert("Please provide an address for door-to-door delivery.");
            return;
        }
        await createOrder(user_id, deliveryMethod, paymentMethod, address, token as string)
    }

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.id)
    }

    const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryMethod(e.target.id);
    }

    return (
        <div className='confirm_order_container'>
            <div className='items_data'>
                <h3>Your order:</h3>
                <p className='order_section'>Product details:</p>
                {cartItems.map((cartItem, index) => (
                    <p className='item_data' key={index}>{cartItem.name} - {cartItem.quantity} - $ {cartItem.price}</p>
                ))}
                <p className='total_price'>Total price: $ {totalPrice}</p>
            </div>

            <div className='payment_data'>
                <p className='order_section'>Please select payment method:</p>
                <FormField className='checkbox_field' name="paymentMethod" id="Card payment" type="radio" handleOnChange={handlePaymentChange} />
                <FormField className='checkbox_field' name="paymentMethod" id="Payment in cash to the courier" type="radio" handleOnChange={handlePaymentChange} />
                <FormField className='checkbox_field' name="paymentMethod" id="Payment by card to the courier" type="radio" handleOnChange={handlePaymentChange} />
            </div>

            <div className='address_data'>
                <p className='order_section'>Please select delivery method:</p>
                <FormField className='checkbox_field' name="deliveryMethod" id="Poczta polska" type="radio" handleOnChange={handleDeliveryChange} />
                <FormField className='checkbox_field' name="deliveryMethod" id="Door to door" type="radio" handleOnChange={handleDeliveryChange} />
                {deliveryMethod === "Door to door" && (
                    <FormField
                        placeholder='Please fill in the address...'
                        id="Address"
                        type="text"
                        handleOnChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required />
                )}
            </div>

            <button onClick={handleSubmit}>Submit order</button>
        </div>
    );
}

export default ConfirmOrderPage;

