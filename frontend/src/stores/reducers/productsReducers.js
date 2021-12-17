import {
    ADD_PRODUCT_FAIL,
    EDIT_PRODUCT_FAIL,
    DELETE_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
    SET_PERSONAL_PRODUCTS,
    DELETE_PRODUCT_SUCCESS,
    GET_USERS_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
} from "../constants/products";


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
            };
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                error: payload,
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                personalProducts: [
                    ...state.personalProducts
                ].map(item => item.id === payload.id ? { ...payload } : { ...item }),
                error: null,
            }
        case EDIT_PRODUCT_FAIL:
            return {
                ...state,
                error: { ...payload },
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                allProducts: [...payload],
            }
        case GET_ALL_PRODUCTS_FAIL:
            return {
                ...state,
                error: { ...payload },
            }
        default:
            return { ...state }
    }
};

export default productsReducers;
