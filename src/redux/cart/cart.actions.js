import cartActionType from './cart.types';

export const toggleCartHidden = () => ({
    type: cartActionType.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
    type: cartActionType.ADD_ITEM,
    payload: item
});

export const clearItemFromCart = item => ({
    type: cartActionType.CLEAR_ITEM_FROM_CART,
    payload: item
})

export const removeItemFromCart = item => ({
    type: cartActionType.REMOVE_ITEM_FROM_CART,
    payload: item
});

export const clearCart = () => ({
    type: cartActionType.CLEAR_CART
});