import shopActionTypes from "./shop.types"

export const updateCollection = collectionsMap => ({
    type: shopActionTypes.UPDATE_COLLECTION,
    payload: collectionsMap
})