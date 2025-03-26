import React, { useEffect, useState } from 'react';
import { getToken, getIDFromToken } from '../../utils';
import { getUserOrders } from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { TypeOrder } from '../../types';
import OrderDetails from './OrderDetails';
import './orderPage.css';

const OrderHistoryPage: React.FC = () => {
    const [orders, setOrders] = useState<TypeOrder[]>([]);
    const token = getToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        getOrders();
    }, []);

    const getOrders = async () => {
        const userOrders = await getUserOrders(token as string);
        if (userOrders) {
            setOrders(userOrders)
        } else {
            setOrders([])
        }
    };

    return (
        <div className='order_history_container'>
            <h2 className='order_history_page_title'>Your Order History</h2>
            {orders && orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className='orders_list'>
                    {orders.map((order) => (
                        <li key={order._id} className='order_item'>
                            <div className='order_data'>
                                <OrderDetails order={order}/>
                                <Link className='order_details_link' to={`/order_history/${order._id}`}> View order details</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistoryPage;
