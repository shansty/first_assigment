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
