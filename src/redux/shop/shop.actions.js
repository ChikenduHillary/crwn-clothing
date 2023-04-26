import shopActionTypes from "./shop.types";
import { firestore } from "../../firebase/firebase.utils";
import { convertCollectionSnapShotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = collectionsMap => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = errorMessage => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionStart());

        collectionRef.get().then(async snapShot =>{
            const collectionsMap = convertCollectionSnapShotToMap(snapShot);
            dispatch(fetchCollectionSuccess(collectionsMap))
        }).catch(error => dispatch(fetchCollectionFailure(error.message)));
    }
}