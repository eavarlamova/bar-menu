import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT_SUCCSES,
    SET_PERSONAL_PRODUCTS,
} from "../constants/products";


export const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload,
});
export const addProductSuccses = (payload) => ({
    type: ADD_PRODUCT_SUCCSES,
    payload,
})

export const setPersonalProducts = (payload) => ({
    type: SET_PERSONAL_PRODUCTS,
    payload,
})

export const deleteProduct = (payload) => ({
    type: DELETE_PRODUCT,
    payload,
})