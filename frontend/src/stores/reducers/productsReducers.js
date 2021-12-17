import {
    ADD_PRODUCT_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
    SET_PERSONAL_PRODUCTS,
    DELETE_PRODUCT_SUCCESS,
    GET_ALL_PRODUCTS_SUCCESS,
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
};

const productsReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                personalProducts: [
                    ...state.personalProducts,
                    payload,
                ],
            };
        case SET_PERSONAL_PRODUCTS:
            return {
                ...state,
                personalProducts: payload,
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                personalProducts: [...state.personalProducts].filter(item => item.id !== payload)
            };
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                personalProducts: [
                    ...state.personalProducts
                ].map(item => item.id === payload.id ? { ...payload } : { ...item }),
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                allProducts: [...payload],
            }
        default:
            return { ...state }
    }
};

export default productsReducers;
