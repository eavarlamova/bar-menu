import { 
    SET_ERROR, 
    RESET_ERROR,
} from "../constants/error";

import { getErrorInfo } from "../../helpers/errorInfo";

const initialState = {
  hasError: false,
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      const error = getErrorInfo(payload);
      return {
        hasError: true,
        ...error,
      };
    case RESET_ERROR:
      return {
        ...initialState,
      };
    default:
      return { ...state };
  }
};

export default errorReducer;
