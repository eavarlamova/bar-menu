import { combineReducers } from "redux";

import usersReducers from "./usersReducers";
import productsReducers from "./productsReducers";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  error: errorReducer,
  users: usersReducers,
  products: productsReducers,
});

export default rootReducer;
