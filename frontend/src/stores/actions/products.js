import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    SET_PERSONAL_PRODUCTS,
    GET_USERS_PRODUCTS,
    GET_USERS_PRODUCTS_FAIL,
} from "../constants/products";
import { parseIngredients } from '../../helpers/parse';


export const addProduct = (payload) => {
    // console.log('payload', payload)
    return ({
        type: ADD_PRODUCT,
        payload,
    })
};
export const addProductFail = (payload) => ({
    type: ADD_PRODUCT_FAIL,
    payload,
});
export const addProductSuccess = (payload) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload,
})

export const setPersonalProducts = (payload) => {
    // console.log('#######', typeof payload[0].ingredients,payload[0].ingredients, '#######')
    // console.log('JSON.parse(payload[0].ingredients)', typeof JSON.parse(payload[0].ingredients , JSON.parse(payload[0].ingredients)))
    // const updatePayload = payload.map(item => {
    //     console.log('item', typeof item, item)
    //     return({ ...item, ingredients: JSON.parse(item.ingredients) })})
    // console.log('updatePayload[0].ingredients', typeof updatePayload[0].ingredients, updatePayload[0].ingredients)

    // const correctProductsList = parseIngredients(payload.products)
    // console.log('correctProductsList', correctProductsList)
    return ({
        type: SET_PERSONAL_PRODUCTS,
        payload,
    })
}

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
})