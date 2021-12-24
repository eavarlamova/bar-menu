import {
  SING_UP,
  SING_IN,
  SING_OUT,
  ADD_INGREDIENT,
  EDIT_USER_INFO,
  SING_IN_SUCCESS,
  SING_OUT_SUCCESS,
  GET_USER_INFORMATION,
  ADD_INGREDIENT_SUCCESS,
  EDIT_USER_INFO_SUCCESS,
  EDIT_PERSONAL_INGREDIENT,
  DELETE_PERSONAL_INGREDIENT,
  GET_USER_INFORMATION_SUCCESS,
  EDIT_PERSONAL_INGREDIENT_SUCCESS,
  DELETE_PERSONAL_INGREDIENT_SUCCESS,
} from "../constants/users";
import { CHECK_JWT } from "../../mainConstants";

const parseUsersInfo = (user) => ({
  ...user,
  users_ingredients: JSON.parse(user.users_ingredients) || [],
});

export const checkJWT = (payload) => ({
  type: CHECK_JWT,
  payload,
});

export const signUp = (payload) => ({
  type: SING_UP,
  payload,
});

export const signIn = (payload) => ({
  type: SING_IN,
  payload,
});
export const signInSuccess = (payload) => ({
  type: SING_IN_SUCCESS,
  payload: parseUsersInfo(payload),
});

export const signOut = (payload) => ({
  type: SING_OUT,
  payload,
});
export const signOutSuccess = () => ({
  type: SING_OUT_SUCCESS,
});

export const addIngredient = (payload) => ({
  type: ADD_INGREDIENT,
  payload,
});
export const addIngredientSuccess = (payload) => ({
  type: ADD_INGREDIENT_SUCCESS,
  payload,
});

export const editPersonalIngredient = (payload) => ({
  type: EDIT_PERSONAL_INGREDIENT,
  payload,
});
export const editPersonalIngredientSuccess = (payload) => ({
  type: EDIT_PERSONAL_INGREDIENT_SUCCESS,
  payload,
});

export const deletePersonalIngredient = (payload) => ({
  type: DELETE_PERSONAL_INGREDIENT,
  payload,
});
export const deletePersonalIngredientSuccess = (payload) => ({
  type: DELETE_PERSONAL_INGREDIENT_SUCCESS,
  payload,
});

export const getUserInformation = (payload) => ({
  type: GET_USER_INFORMATION,
  payload,
});
export const getUserInformationSuccess = (payload) => ({
  type: GET_USER_INFORMATION_SUCCESS,
  payload,
});

export const editUserInfo = (payload) => ({
  type: EDIT_USER_INFO,
  payload,
});
export const editUserInfoSuccess = (payload) => ({
  type: EDIT_USER_INFO_SUCCESS,
  payload,
});
