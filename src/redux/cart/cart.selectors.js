import { creatSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = creatSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = creatSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);