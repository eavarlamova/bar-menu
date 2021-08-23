import {
  SING_UP,
  SING_IN,
  SING_OUT,
  SIGN_UP_FAIL,
  SING_IN_FAIL,
  SIGN_OUT_FAIL,
  SING_IN_SUCCESS,
  SING_OUT_SUCCESS,
} from "../constants/users";

import { CHECK_JWT } from '../../mainConstants'

export const checkJWT = (payload) => ({
  type: CHECK_JWT,
  payload,
})

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
  payload,
})
export const signInFail = (payload) => ({
  type: SING_IN_FAIL,
  payload,
})

export const signOut = (payload) => ({
  type: SING_OUT,
  payload,
});
export const signOutSuccess = () => ({
  type: SING_OUT_SUCCESS,
});
export const signOutFail = (payload) => ({
  type: SIGN_OUT_FAIL,
  payload,
})