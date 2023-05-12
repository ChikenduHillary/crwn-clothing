import { takeLatest, all, put, call } from 'redux-saga/effects';
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';
import { googleSignInFailure, googleSignInSuccess } from './user.actions';
import userActionTypes from './user.types';

export function* onGoogleSignIn() {
    try {
        const { user } = yield signInWithGoogle = auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(googleSignInFailure(error));
    }

}

export function* onGoogleSignInStart() {
    yield takeLatest(call(userActionTypes.GOOGLE_SIGN_IN_START, onGoogleSignIn));
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart)]);
}