import { call, put, takeEvery } from "redux-saga/effects"
import axios from 'axios';

import { URL, CHECK_JWT, URL_FRONT } from '../../mainConstants';
import {
  SING_UP,
  SING_IN,
  SING_OUT,
  ADD_INGREDIENT,
  GET_USER_INFORMATION,
  EDIT_PERSONAL_INGREDIENT,
  DELETE_PERSONAL_INGREDIENT,
  EDIT_USER_INFO,
} from '../constants/users';
import {
  signInFail,
  signOutFail,
  signInSuccess,
  signOutSuccess,
  editUserInfoFail,
  addIngredientFail,
  editUserInfoSuccess,
  addIngredientSuccess,
  getUserInformationFail,
  getUserInformationSuccess,
  editPersonalIngredientFail,
  deletePersonalIngredientFail,
  editPersonalIngredientSuccess,
  deletePersonalIngredientSuccess,
} from "../actions/users"
import {
  getUsersProducts,
  setPersonalProducts,
} from "../actions/products";

import { setJWT } from "../../helpers/jwt";
import { getFormData } from '../../helpers/formData';
import { getErrorInfo } from '../../helpers/errorInfo';
import { makeAxiosWithJWTHeader } from '../../helpers/axiosHeader';




const HANDLER = {
  *[CHECK_JWT](payload) {
    try {
      const { data } = yield makeAxiosWithJWTHeader('users/check')
      yield put(signInSuccess(data))
      yield put(getUsersProducts(data.id))
    }
    catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(signInFail({ status, msg }))
      setJWT('')
    }
  },
  *[SING_UP](payload) {
    try {
      const { data } = yield call(axios, `${URL}/users/signup`, {
        method: "POST",
        data: payload
      })
      yield put(signInSuccess(data))
      setJWT(data.jwt);
    }
    catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(signInFail({ status, msg }))
    }
  },

  *[SING_IN](payload) {
    try {
      const { data } = yield call(axios, `${URL}/users/signin`, {
        method: "POST",
        data: payload
      })
      yield put(signInSuccess(data))
      setJWT(data.jwt);

      yield put(getUsersProducts(data.id))
    }
    catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(signInFail({ status, msg }))
    }
  },

  *[SING_OUT](payload) {
    try {
      yield call(axios, `${URL}/users/signout/${payload}`);
      yield put(signOutSuccess());
      yield put(setPersonalProducts([]));
      setJWT('');
    }
    catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(signOutFail({ status, msg }))
    }
  },

  *[ADD_INGREDIENT](payload) {
    try {
      const { data: allUsersIngredients } = yield makeAxiosWithJWTHeader(
        'users/add-ingredient',
        'PATCH',
        payload,
      );
      yield put(addIngredientSuccess(allUsersIngredients))
    }
    catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(addIngredientFail({ msg, status }));
    }
  },
  *[EDIT_PERSONAL_INGREDIENT](payload) {
    try {
      const { data } = yield makeAxiosWithJWTHeader(
        'users/edit-ingredient',
        'PATCH',
        payload,
      );
      yield put(editPersonalIngredientSuccess(data))
    }
    catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(editPersonalIngredientFail({ msg, status }))
    }
  },
  *[DELETE_PERSONAL_INGREDIENT](payload) {
    try {
      const { data } = yield makeAxiosWithJWTHeader(
        `users/${payload}`,
        'DELETE',
      );
      yield put(deletePersonalIngredientSuccess(data))
    }
    catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(deletePersonalIngredientFail({ msg, status }))
    }
  },
  *[GET_USER_INFORMATION](payload) {
    try {
      const { data } = yield call(axios, `${URL}/users/${payload}`);
      yield put(getUserInformationSuccess(data))
    }
    catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(getUserInformationFail({ msg, status }))
    }
  },
  *[EDIT_USER_INFO](payload) {
    try {
      const formData = getFormData(payload, 'user');
      const { data } = yield makeAxiosWithJWTHeader(
        'users/edit',
        'PATCH',
        formData,
      );
      yield put(editUserInfoSuccess(data));
      yield put(getUsersProducts(data.id))

    } catch (error) {
      const { msg, status } = getErrorInfo(error);
      yield put(editUserInfoFail({ msg, status }))
    }
  },

};

function* sagaManage({ type, payload }) {
  const handler = HANDLER[type];
  if (handler) yield handler(payload);
};

function* usersSagaWatcher() {
  yield takeEvery('*', sagaManage)
}

export default usersSagaWatcher;