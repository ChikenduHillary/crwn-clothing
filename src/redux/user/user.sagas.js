import { takeLatest, all, put, call } from 'redux-saga/effects';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure } from './user.actions';
import userActionTypes from './user.types';

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error));
    }

};

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;

        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailure(error))
    }
};

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error))
    }
};

export function* signUp({payload: {displayName, email, password, confirmPassword}}) {
    try {
        if (password !== confirmPassword) {
            alert("password don't match");
            return;
        }
            const { user } = yield auth.createUserWithEmailAndPassword(email, password);
            yield getSnapshotFromUserAuth(user, { displayName })
            yield createUserProfileDocument(user, { displayName });

    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* onGoogleSignInStart() {

    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onSignOut() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
};

export function* onSignUp() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* userSagas() {
    yield all([call(onSignUp), call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOut)]);
}