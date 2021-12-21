import { GET_ALL_PRODUCTS_FAIL } from "../constants/products";
import {
  SING_IN_SUCCESS,
  SING_OUT_SUCCESS,
  ADD_INGREDIENT_SUCCESS,
  EDIT_USER_INFO_SUCCESS,
  GET_USER_INFORMATION_SUCCESS,
  EDIT_PERSONAL_INGREDIENT_SUCCESS,
  DELETE_PERSONAL_INGREDIENT_SUCCESS,
} from "../constants/users";



const initialState = {
  user: {
    email: '',
    name: '',
    id: null,
    users_ingredients: '',
  },
  selectedUserData: null,
  isAuth: false,
}


const usersReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SING_IN_SUCCESS:
      return {
        ...state,
        user: { ...payload },
        isAuth: true,
      };
    case SING_OUT_SUCCESS:
      return {
        ...initialState,
      };
    case ADD_INGREDIENT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          users_ingredients: payload || [],
        }
      }
    case EDIT_PERSONAL_INGREDIENT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          users_ingredients: payload,
        }
      }
    case DELETE_PERSONAL_INGREDIENT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          users_ingredients: payload || [],
        }
      }
    case GET_USER_INFORMATION_SUCCESS:
      return {
        ...state,
        selectedUserData: { ...payload }
      }
    case EDIT_USER_INFO_SUCCESS:
      return {
        ...state,
        user: payload,
      }
    default:
      return { ...state };
  }
};


export default usersReducers;