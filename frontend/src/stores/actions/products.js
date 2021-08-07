import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT_SUCCSES,
} from "../constants/products";


export const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload,
});
export const addProductSuccses = (payload) => ({
    type: ADD_PRODUCT_SUCCSES,
    payload,
})

export const deleteProduct = (payload) => ({
    type: DELETE_PRODUCT,
    payload,
})