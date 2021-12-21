import { combineReducers } from "redux";

import usersReducers from "./usersReducers";
import productsReducers from "./productsReducers";
import ingredientsReducers from "./ingredientsReducers";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    error: errorReducer,
    users: usersReducers,
    products: productsReducers,
    ingredients: ingredientsReducers,
});

export default rootReducer;