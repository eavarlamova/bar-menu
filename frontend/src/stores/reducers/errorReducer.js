import {
    SET_ERROR,
    RESET_ERROR,
} from '../constants/error';

const initialState = {
    hasError: false,
    // msg: 'text', // can be
    // status: 404, // can be
};

const errorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ERROR:
            return {
                hasError: true,
                ...payload,
            }
        case RESET_ERROR:
            return {
                initialState,
            }
        default:
            return {
                ...state,
            }
    }
};

export default errorReducer;