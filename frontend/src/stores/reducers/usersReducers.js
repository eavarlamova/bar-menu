import {
  SING_OUT,
  SING_IN_FAIL,
  SIGN_OUT_FAIL,
  SING_IN_SUCCSES,
  SING_OUT_SUCCSES,
} from "../constants/users";

const initialState = {
  user: {
    email: '',
    name: '',
    id: null,
    users_ingredients: '',
  },
  isAuth: false,
  error: null,
}


const usersReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SING_IN_SUCCSES:
      return {
        ...state,
        user: { ...payload },
        isAuth: true,
        error: null,
      };
    case SING_IN_FAIL:
      return {
        ...state,
        isAuth: false,
        error: { ...payload },
      };

    case SING_OUT_SUCCSES:
      return {
        ...initialState,
      };
    case SIGN_OUT_FAIL:
      return {
        ...state,
        error: { ...payload }
      }
    default:
      return { ...state };
  }
};


export default usersReducers;