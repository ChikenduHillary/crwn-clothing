import { call, put, takeLatest, all } from "redux-saga/effects";

import userActionTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearCartStart() {
    yield put(clearCart())
}
export function* onClearCart() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartStart)
}

export function* cartSagas() {
   yield all([call(onClearCart)])
}