import {
    ADD_PRODUCT_SUCCSES,
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
        case ADD_PRODUCT_SUCCSES:
            return {
                ...state,
                personalProducts: [
                    ...state.personalProducts,
                    payload,
                ]
            };
        default:
            return { ...state }
    }
};

export default productsReducers;
