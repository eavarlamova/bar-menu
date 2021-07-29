import { ADD_PRODUCT } from "../constants/products";

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
    }
};

const productsReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_PRODUCT:
            return { ...state };
        default:
            return { ...state }
    }
};

export default productsReducers;
