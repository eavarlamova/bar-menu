import { combineReducers } from "redux";

import usersReducers from "./usersReducers";
import productsReducers from "./productsReducers";
import ingredientsReducers from "./ingredientsReducers";


const rootReducer = combineReducers({
    users: usersReducers,
    products: productsReducers,
    ingredients: ingredientsReducers,
});

export default rootReducer;