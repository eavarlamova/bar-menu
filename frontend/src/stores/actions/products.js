import {
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT_FAIL,
    GET_ALL_PRODUCTS,
    EDIT_PRODUCT_FAIL,
    GET_USERS_PRODUCTS,
    DELETE_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
    SET_PERSONAL_PRODUCTS,
    GET_ALL_PRODUCTS_FAIL,
    DELETE_PRODUCT_SUCCESS,
    GET_USERS_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_SUCCESS,
} from "../constants/products";


export const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload,
});
export const addProductFail = (payload) => ({
    type: ADD_PRODUCT_FAIL,
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
export const deleteProductFail = (payload) => ({
    type: DELETE_PRODUCT_FAIL,
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
export const getUsersProductsFail = (payload) => ({
    type: GET_USERS_PRODUCTS_FAIL,
    payload,
});

export const editProduct = (payload) => ({
    type: EDIT_PRODUCT,
    payload,
});
export const editProductFail = (payload) => ({
    type: EDIT_PRODUCT_FAIL,
    payload,
});
export const editProductSuccess = (payload) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload,
});

export const getAllProducts = () => ({
    type: GET_ALL_PRODUCTS,
});
export const getAllProductsFail = (payload) => ({
    type: GET_ALL_PRODUCTS_FAIL,
    payload,
});
export const getAllProductsSuccess = (payload) => ({
    type: GET_ALL_PRODUCTS_SUCCESS,
    payload,
});