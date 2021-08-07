import {
  SING_UP,
  SING_IN,
  SING_OUT,
  SIGN_UP_FAIL,
  SING_IN_FAIL,
  SIGN_UP_SUCCSES,
  SING_IN_SUCCSES,
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
  switch (type) {
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
        isAuth: false,
        error: { ...payload }
      }

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

    case SING_OUT:
      return { ...state };
    default:
      return { ...state };
  }
};


export default usersReducers;