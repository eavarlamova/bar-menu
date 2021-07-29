import { ADD_INGREDIENT } from "../constants/ingredients";

export const addIngredient = (payload) => ({
    type: ADD_INGREDIENT,
    payload,
 })