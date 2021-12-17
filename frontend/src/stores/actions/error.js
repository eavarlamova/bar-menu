import {
  SET_ERROR,
  RESET_ERROR,
} from '../constants/error';

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});
export const resetError = () => ({
  type: RESET_ERROR,
})