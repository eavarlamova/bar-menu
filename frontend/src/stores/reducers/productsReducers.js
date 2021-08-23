import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    GET_USERS_PRODUCTS_FAIL,
    SET_PERSONAL_PRODUCTS,
    DELETE_PRODUCT_SUCCESS,
} from "../constants/products";
import { parseIngredients } from '../../helpers/parse';


const initialState = {
    currentProduct: {
        product: '',
        ingredients: [
            {
                ingredient: '',
                count: 0,
                units: '',
            }
        ],
        description: ['step1', 'step2', 'step3'],
    },
    personalProducts: [], // [{},{}]
    error: null,
};

const productsReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_PRODUCT_FAIL:
            return {
                ...state,
                error: { ...payload }
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                personalProducts: [
                    ...state.personalProducts,
                    payload,
                ],
                error: null,

            };
        case SET_PERSONAL_PRODUCTS:
            return {
                ...state,
                personalProducts: payload,
                error: null
            }
        case GET_USERS_PRODUCTS_FAIL:
            return {
                ...state,
                error: payload,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                error: null,
                personalProducts: [...state.personalProducts].filter(item => item.id !== payload) 
            }
        default:
            return { ...state }
    }
};

export default productsReducers;
