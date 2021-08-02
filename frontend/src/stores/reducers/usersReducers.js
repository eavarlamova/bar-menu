import {
    SING_UP,
    SING_IN,
    SING_OUT,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCSES,
} from "../constants/users";

const initialState = {
    user: {
        email: '',
        name: '',
        id: null,
        user_ingredients: '',
    },
    isAuth: false,
    error: null,
}


const usersReducers = (state = initialState, { type, payload }) => {
    console.log('type', type)
    switch (type) {
        case SING_UP:
            return { ...state };
        case SIGN_UP_SUCCSES:
            return {
                ...state,
                user: { ...payload },
                isAuth: true,
                error: null,
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                error: { ...payload }
            }
        case SING_IN:
            return { ...state };
        case SING_OUT:
            return { ...state };
        default:
            return { ...state };
    }
};


export default usersReducers;