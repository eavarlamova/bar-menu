import axios from "axios";
import { useSelector } from "react-redux";
import { call, put, takeEvery } from "redux-saga/effects"

import { URL } from "../../mainConstants";
import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    GET_USERS_PRODUCTS,
} from '../constants/products';
import {
    addProductFail,
    deleteProductFail,
    addProductSuccess,
    setPersonalProducts,
    deleteProductSuccess,
    getUsersProductsFail,
} from '../actions/products';
import { makeAxiosWithJWTHeader } from '../../helpers/axiosHeader';
import { getErrorInfo } from '../../helpers/errorInfo';


const HANDLER = {
    *[ADD_PRODUCT](payload) {
        try {
            const { data } = yield makeAxiosWithJWTHeader('products/add', 'POST', payload)
            yield put(addProductSuccess(data))
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(addProductFail({ msg, status }))
        }
    },

    *[GET_USERS_PRODUCTS](id) {
        try {
            const { data } = yield makeAxiosWithJWTHeader(`products/${id}`)
            yield put(setPersonalProducts(data))
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(getUsersProductsFail({ msg, status }))
        }
    },
    *[DELETE_PRODUCT](id) {
        try {
            yield makeAxiosWithJWTHeader(`products/${id}`,'DELETE')
            yield put(deleteProductSuccess(id));
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(deleteProductFail({ msg, status }))
        }
    }

};

function* sagaManage({ type, payload }) {
    const handler = HANDLER[type];
    if (handler) yield handler(payload);
};

function* productsSagaWatcher() {
    yield takeEvery('*', sagaManage)
}

export default productsSagaWatcher;