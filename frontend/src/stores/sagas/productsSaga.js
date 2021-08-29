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


const HANDLER = {
    *[ADD_PRODUCT](payload) {
        try {
            const { data } = yield call(axios, `${URL}/products/add`, {
                method: "POST",
                data: payload,
            });
            yield put(addProductSuccess(data))
        }
        catch (error) {
            const {
                response: {
                    data: { msg },
                    status,
                }
            } = error;
            yield put(addProductFail({ msg, status }))
        }
    },

    *[GET_USERS_PRODUCTS](id) {
        try {
            const { data } = yield call(axios, `${URL}/products/${id}`);
            yield put(setPersonalProducts(data))
        }
        catch (error) {
            const {
                response: {
                    data: { msg },
                    status,
                }
            } = error;
            yield put(getUsersProductsFail({ msg, status }))
        }
    },
    *[DELETE_PRODUCT](id) {
        try {
            yield call(axios, `${URL}/products/${id}`, {
                method: 'DELETE',
            })
            yield put(deleteProductSuccess(id));
        }
        catch (error) {
            const {
                response: {
                    data: { msg },
                    status,
                }
            } = error;
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