import axios from "axios";
import { 
  put, 
  call, 
  takeEvery,
} from "redux-saga/effects";

import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_USERS_PRODUCTS,
} from "../constants/products";
import { URL } from "../../mainConstants";

import {
  addProductSuccess,
  editProductSuccess,
  setPersonalProducts,
  deleteProductSuccess,
  getAllProductsSuccess,
} from "../actions/products";
import { 
  setError, 
  resetError,
} from "../actions/error";

import { getFormData } from "../../helpers/formData";
import { makeAxiosWithJWTHeader } from "../../helpers/axiosHeader";

const HANDLER = {
  *[ADD_PRODUCT](payload) {
    try {
      const formData = getFormData(payload);
      const { data } = yield makeAxiosWithJWTHeader(
        "products/add",
        "POST",
        formData,
        "multipart/form-data"
      );
      yield put(addProductSuccess(data));
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
    }
  },
  *[GET_USERS_PRODUCTS](id) {
    try {
      const { data } = yield makeAxiosWithJWTHeader(`products/${id}`);
      yield put(setPersonalProducts(data));
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
    }
  },
  *[DELETE_PRODUCT](id) {
    try {
      yield makeAxiosWithJWTHeader(`products/${id}`, "DELETE");
      yield put(deleteProductSuccess(id));
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
    }
  },
  *[EDIT_PRODUCT](payload) {
    try {
      const formData = getFormData(payload);
      const { data } = yield makeAxiosWithJWTHeader(
        `products/edit-product`,
        "PUT",
        formData,
        "multipart/form-data"
      );
      yield put(editProductSuccess(data));
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
    }
  },
  *[GET_ALL_PRODUCTS]() {
    try {
      const { data } = yield call(axios, `${URL}/products`, {
        method: "GET",
      });
      yield put(getAllProductsSuccess(data));
      yield put(resetError());
    } catch (error) {
      yield put(setError(error));
    }
  },
};

function* sagaManage({ type, payload }) {
  const handler = HANDLER[type];
  if (handler) yield handler(payload);
}

function* productsSagaWatcher() {
  yield takeEvery("*", sagaManage);
}

export default productsSagaWatcher;
