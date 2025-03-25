import { Request, Response } from "express";
import { getProductByQuery, getCartItemByQuery, increaseCartItemQuantityAndPrice, decreaseCartItemQuantityAndPrice, createCartItem, findCartItemByQuery } from "./utils";


export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product, user_id } = req.body;

        const product_db = await getProductByQuery({ id: product.id });
        if (!product_db) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        let cartItem = await getCartItemByQuery({ product_id: product_db._id, user_id: user_id });
        if (cartItem) {
            await increaseCartItemQuantityAndPrice(cartItem, product_db)
        } else {
            await createCartItem(product_db, user_id)
        }
        res.status(200).json({ message: "Product added to cart", cartItem });
    } catch (error: any) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};


export const getCartItems = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id;
        if (!user_id) {
            res.status(400).json({ message: "User with such credentials not found" });
            return;
        }
        const cart_items = await findCartItemByQuery({ user_id: user_id })
        res.status(200).json({ cart_items: cart_items });
    } catch (error: any) {
        res.status(500).json({ message: "Error getting cart items", error });
    }
};



export const updateCartItemQuantity = async (req: Request, res: Response) => {
    try {
        const increase_operation = "increase";
        const decrease_operation = "decrease";
        const user_id = req.params.user_id;
        const user_id_from_token = req.user.id;
        const { operation, cart_item_id } = req.body;

        if (user_id !== user_id_from_token) {
            res.status(404).json({ message: "Incorrect user data" });
            return;
        }

        if (!user_id) {
            res.status(400).json({ message: "User with such credentials not found" });
            return;
        }

        const cart_item = await getCartItemByQuery({ user_id: user_id, _id: cart_item_id });

        if (!cart_item) {
            res.status(400).json({ message: "User doesn't have such cart item" });
            return;
        }

        const product = await getProductByQuery({ _id: cart_item.product_id })
        if (!product) {
            res.status(400).json({ message: "Such product doesn't exists" });
            return;
        }

        if (operation === increase_operation) {
            increaseCartItemQuantityAndPrice(cart_item, product)
        } else if (operation === decrease_operation && cart_item.quantity > 1) {
            decreaseCartItemQuantityAndPrice(cart_item, product)
        } else {
            await cart_item.deleteOne();
        }
        res.status(200).json({ message: "Cart updated successfully", cart_item });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
