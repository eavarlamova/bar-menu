import axios from 'axios';
import { call, put, takeEvery } from "redux-saga/effects"

import {
  URL,
  CHECK_JWT,
} from '../../mainConstants';
import {
  SING_UP,
  SING_IN,
  SING_OUT,
  ADD_INGREDIENT,
  EDIT_USER_INFO,
  GET_USER_INFORMATION,
  EDIT_PERSONAL_INGREDIENT,
  DELETE_PERSONAL_INGREDIENT,
} from '../constants/users';
import {
  signInSuccess,
  signOutSuccess,
  editUserInfoSuccess,
  addIngredientSuccess,
  getUserInformationSuccess,
  editPersonalIngredientSuccess,
  deletePersonalIngredientSuccess,
} from "../actions/users"
import {
  getUsersProducts,
  setPersonalProducts,
} from "../actions/products";
import { setError, resetError } from "../actions/error";

import { setJWT } from "../../helpers/jwt";
import { getFormData } from '../../helpers/formData';
import { makeAxiosWithJWTHeader } from '../../helpers/axiosHeader';



const HANDLER = {
  *[CHECK_JWT]() {
    try {
      const { data } = yield makeAxiosWithJWTHeader('users/check')
      yield put(signInSuccess(data))
      yield put(getUsersProducts(data.id))
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
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
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
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
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
    }
  },
  *[SING_OUT](payload) {
    try {
      yield call(axios, `${URL}/users/signout/${payload}`);
      yield put(signOutSuccess());
      yield put(setPersonalProducts([]));
      setJWT('');
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
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
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
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
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
    }
  },
  *[DELETE_PERSONAL_INGREDIENT](payload) {
    try {
      const { data } = yield makeAxiosWithJWTHeader(
        `users/${payload}`,
        'DELETE',
      );
      yield put(deletePersonalIngredientSuccess(data))
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
    }
  },
  *[GET_USER_INFORMATION](payload) {
    try {
      const { data } = yield call(axios, `${URL}/users/${payload}`);
      yield put(getUserInformationSuccess(data))
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
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
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
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