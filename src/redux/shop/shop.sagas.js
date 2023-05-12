import { call, put, takeEvery } from 'redux-saga/effects';
import { convertCollectionSnapShotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchCollectionFailure, fetchCollectionSuccess } from './shop.actions';

import shopActionTypes from './shop.types';

export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapShotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionFailure(error.message))
    }
}

export function* fetchCollectionStart() {
    yield takeEvery(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionAsync
    );
}