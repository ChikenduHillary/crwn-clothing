import { call, put, takeLatest, all } from "redux-saga/effects";

import userActionTypes from "../user/user.types";

export function* clearCart() {
    yield put(clearCart())
}
export function* onClearCart() {
    yield takeLatest(call(userActionTypes.SIGN_OUT_SUCCESS, clearCart))
}

export function* cartSagas() {
   yield all([call(onClearCart)])
}