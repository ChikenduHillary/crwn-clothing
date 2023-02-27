import cartActionType from './cart.types';

export const toggleCartHidden = () => ({
    type: cartActionType.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
    type: "ADD_ITEM",
    payload: item
})