import React from 'react';
import { TypeOrder } from '../../types';

interface OrderDetailsProps {
    order: TypeOrder
}

const OrderDetails:React.FC<OrderDetailsProps> = ({order}) => {
    return (
        <div>
            <p><strong>Order number: </strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total Price:</strong> ${order.total_price}</p>
            <p><strong>Payment Method:</strong> {order.payment_method}</p>
            <p><strong>Delivery Method:</strong> {order.delivery?.method}</p>
            {order.delivery?.method === "Door to door" && (
                <p><strong>Address:</strong> {order.delivery.address}</p>
            )}
        </div>
    );
}

export default OrderDetails;
