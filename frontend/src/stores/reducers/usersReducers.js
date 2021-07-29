import {
    SING_UP,
    SING_IN,
    SING_OUT,
} from "../constants/users";

const initialState = {
    user: {
        email: '',
        name: '',
        id: null,
    },
    isAuth: false,
    error: null,
}


const usersReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case SING_UP:
            return { ...state };
        case SING_IN:
            return { ...state };
        case SING_OUT:
            return { ...state };
        default:
            return { ...state };
    }
};


export default usersReducers;