export type TypeProduct = {
    id?: number;
    image?: string;
    title?: string;
    price?: number;
    description?: string;
    category_id?: number;
    _id?: string;
};

export type TypeUser = {
    id?: number;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    address?: string
};

export type TypeCartItem = {
    readonly _id?: string;
    product_id?: string;
    user_id?: string;
    name?: string;
    quantity?: number;
    price?: number;
};

export type TypeOrder = {
    readonly _id?: string;
    order_items?: TypeCartItem[];
    readonly user_id?: string;
    status?: "Processing" | "Shipped" | "Completed" | "Cancelled";
    total_amount?: number;
    total_price?: number;
    delivery?: {
        method?: string;
        address?: string;
    };
    payment_method?: "Card payment" | "Payment in cash to the courier" | "Payment by card to the courier";
};

