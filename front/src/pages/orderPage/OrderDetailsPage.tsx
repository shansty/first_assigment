import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails } from '../../axios';
import { TypeOrder } from '../../types';
import { getToken } from '../../utils';
import OrderDetails from './OrderDetails';


const OrderDetailsPage: React.FC = () => {
    const { order_id } = useParams<{ order_id : string | undefined}>();
    const [order, setOrder] = useState<TypeOrder | null>(null);
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
    }, []);

    useEffect(() => {
        if (order_id) {
            getOrderData();
        }
    }, [order_id]);

    const getOrderData = async () => {
        const orderData = await getOrderDetails(order_id as string, token as string);
        if (orderData) {
            setOrder(orderData);
        }
    };

    return (
        <div className="order_details_container">
            {order ? (
                <>
                    <h3 className='order_detail_title'>Order Details</h3>
                    <OrderDetails order={order}/>
                    <h3 className='order_detail_title'>Items:</h3>
                    <ul className="order_items_list">
                        {order.order_items?.map((item, index) => (
                            <li key={index} className="order_item_detail">
                                <p><strong>Product:</strong> {item.name}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Price:</strong> ${item.price}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderDetailsPage;
