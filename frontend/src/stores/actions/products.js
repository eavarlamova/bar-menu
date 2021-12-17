import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    GET_ALL_PRODUCTS,
    GET_USERS_PRODUCTS,
    ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
    SET_PERSONAL_PRODUCTS,
    DELETE_PRODUCT_SUCCESS,
    GET_ALL_PRODUCTS_SUCCESS,
} from "../constants/products";


export const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload,
});
export const addProductSuccess = (payload) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload,
})

export const setPersonalProducts = (payload) => ({
    type: SET_PERSONAL_PRODUCTS,
    payload,
});

export const deleteProduct = (payload) => ({
    type: DELETE_PRODUCT,
    payload,
});
export const deleteProductSuccess = (payload) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload,
})

export const getUsersProducts = (payload) => ({
    type: GET_USERS_PRODUCTS,
    payload,
});


export const editProduct = (payload) => ({
    type: EDIT_PRODUCT,
    payload,
});
export const editProductSuccess = (payload) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload,
});

export const getAllProducts = () => ({
    type: GET_ALL_PRODUCTS,
});
export const getAllProductsSuccess = (payload) => ({
    type: GET_ALL_PRODUCTS_SUCCESS,
    payload,
});