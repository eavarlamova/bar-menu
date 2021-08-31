import {
  SING_IN_FAIL,
  SIGN_OUT_FAIL,
  SING_IN_SUCCESS,
  SING_OUT_SUCCESS,
  ADD_INGREDIENT_FAIL,
  ADD_INGREDIENT_SUCCESS,
  EDIT_PERSONAL_INGREDIENT_FAIL,
  EDIT_PERSONAL_INGREDIENT_SUCCESS,
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
    case SING_IN_SUCCESS:
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

    case SING_OUT_SUCCESS:
      return {
        ...initialState,
      };
    case SIGN_OUT_FAIL:
      return {
        ...state,
        error: { ...payload }
      }
    case ADD_INGREDIENT_SUCCESS:
      return {
        ...state,
        error: null,
        user: {
          ...state.user,
          users_ingredients: payload || [],
        }
      }
    case ADD_INGREDIENT_FAIL:
      return {
        ...state,
        error: { ...payload },
      }
    case EDIT_PERSONAL_INGREDIENT_SUCCESS:
      return {
        ...state,
        error: null,
        user: {
          ...state.user,
          users_ingredients: payload,
        }
      }
    case EDIT_PERSONAL_INGREDIENT_FAIL:
      return {
        ...state,
        error: { ...payload }
      }
    default:
      return { ...state };
  }
};


export default usersReducers;